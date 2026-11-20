import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { WorkflowStage } from '../data/portfolioData';

interface WorkflowFlowchartSvgProps {
  stages: WorkflowStage[];
  onStageContextMenu?: (
    e: React.MouseEvent<Element>,
    stageIndex: string,
    stageTitle: string
  ) => void;
}

/**
 * Deterministic word wrapper for clean static SVG text layout without clipping.
 */
function wrapTextLines(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Minimal, static Antique Gold D3.js architectural SVG flowchart for the
 * four-stage Analytical Workflow. Adapts between a 4-column horizontal flow
 * on wide viewports and a stacked vertical flow on compact viewports.
 */
export function WorkflowFlowchartSvg({
  stages,
  onStageContextMenu,
}: WorkflowFlowchartSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const contextMenuCallbackRef = useRef(onStageContextMenu);
  contextMenuCallbackRef.current = onStageContextMenu;

  const [isCompact, setIsCompact] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 960 : false
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const updateMode = (width: number) => {
      if (width > 0) {
        setIsCompact(width < 820);
      }
    };

    updateMode(el.clientWidth);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        updateMode(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl || stages.length === 0) return;

    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const GOLD = '#C49A52';
    const GOLD_DARK = '#7D5B22';
    const NAVY = '#142B40';
    const SLATE = '#4D5C6B';
    const INK = '#101820';
    const IVORY = '#F8F4EC';
    const PAPER = '#FFFFFF';
    const HEADING_FONT = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
    const BODY_FONT = "'Inter', system-ui, -apple-system, sans-serif";

    // Accessible SVG title & description
    svg
      .append('title')
      .attr('id', 'workflow-diagram-title')
      .text('Analytical Workflow — Four-Stage Process Flowchart');
    svg
      .append('desc')
      .attr('id', 'workflow-diagram-desc')
      .text(
        stages
          .map(
            (s) =>
              `Stage ${s.index} of 04: ${s.title}. ${s.summary} Capabilities: ${s.items.join(', ')}.`
          )
          .join(' ')
      );

    const defs = svg.append('defs');

    // Subtle Antique Gold horizontal gradient for the spine
    const spineGrad = defs
      .append('linearGradient')
      .attr('id', 'antique-gold-spine-grad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', isCompact ? '0%' : '100%')
      .attr('y2', isCompact ? '100%' : '0%');
    spineGrad.append('stop').attr('offset', '0%').attr('stop-color', GOLD).attr('stop-opacity', 0.55);
    spineGrad.append('stop').attr('offset', '50%').attr('stop-color', GOLD).attr('stop-opacity', 0.9);
    spineGrad
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', GOLD)
      .attr('stop-opacity', 0.55);

    const drawDiamond = (
      parent: d3.Selection<SVGGElement, unknown, null, undefined>,
      cx: number,
      cy: number,
      r: number,
      fill: string,
      stroke?: string,
      strokeWidth = 0
    ) => {
      const p = d3.path();
      p.moveTo(cx, cy - r);
      p.lineTo(cx + r, cy);
      p.lineTo(cx, cy + r);
      p.lineTo(cx - r, cy);
      p.closePath();

      const node = parent.append('path').attr('d', p.toString()).attr('fill', fill);
      if (stroke && strokeWidth > 0) {
        node.attr('stroke', stroke).attr('stroke-width', strokeWidth);
      }
      return node;
    };

    if (!isCompact) {
      // =========================================================================
      // DESKTOP / WIDE ARCHITECTURAL HORIZONTAL FLOWCHART (4 Columns)
      // =========================================================================
      const svgWidth = 1120;
      const padX = 20;
      const colGap = 24;
      const cardWidth = (svgWidth - padX * 2 - colGap * (stages.length - 1)) / stages.length;
      const spineY = 38;
      const cardTop = 82;
      const cardPadX = 20;
      const cardPadTop = 22;
      const cardPadBottom = 22;

      const xScale = d3
        .scalePoint<string>()
        .domain(stages.map((s) => s.id))
        .range([padX + cardWidth / 2, svgWidth - padX - cardWidth / 2]);

      const layoutMetrics = stages.map((stage) => {
        const titleLines = wrapTextLines(stage.title, 22);
        const summaryLines = wrapTextLines(stage.summary, 32);
        const itemLinesList = stage.items.map((item) => wrapTextLines(item, 27));
        const totalItemLines = itemLinesList.reduce((sum, lines) => sum + lines.length, 0);

        const indexHeight = 16;
        const titleHeight = titleLines.length * 22;
        const summaryHeight = summaryLines.length * 18.5;
        const itemsHeight = totalItemLines * 17 + (stage.items.length - 1) * 5;
        const totalHeight =
          cardPadTop +
          indexHeight +
          8 +
          titleHeight +
          10 +
          summaryHeight +
          16 + // divider gap
          14 + // post-divider gap
          itemsHeight +
          cardPadBottom;

        return {
          stage,
          cx: xScale(stage.id) ?? padX + cardWidth / 2,
          titleLines,
          summaryLines,
          itemLinesList,
          totalHeight,
        };
      });

      const uniformCardHeight = Math.max(...layoutMetrics.map((m) => m.totalHeight));
      const svgHeight = Math.ceil(cardTop + uniformCardHeight + 18);

      svg
        .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
        .attr('width', '100%')
        .attr('preserveAspectRatio', 'xMidYMid meet');

      const connectorsLayer = svg.append('g').attr('aria-hidden', 'true');
      const nodesLayer = svg.append('g');

      // Horizontal D3 links & directional chevrons between sequential diamond nodes
      const horizontalLink = d3
        .linkHorizontal<{ source: [number, number]; target: [number, number] }, [number, number]>()
        .x((d) => d[0])
        .y((d) => d[1]);

      for (let i = 0; i < layoutMetrics.length - 1; i++) {
        const fromX = layoutMetrics[i].cx + 14;
        const toX = layoutMetrics[i + 1].cx - 14;
        const midX = (fromX + toX) / 2;

        connectorsLayer
          .append('path')
          .attr(
            'd',
            horizontalLink({
              source: [fromX, spineY],
              target: [toX, spineY],
            }) ?? ''
          )
          .attr('fill', 'none')
          .attr('stroke', 'url(#antique-gold-spine-grad)')
          .attr('stroke-width', 1.35);

        // Minimal Antique Gold directional chevron at midpoint
        const chevron = d3.path();
        chevron.moveTo(midX - 4, spineY - 4.5);
        chevron.lineTo(midX + 2.5, spineY);
        chevron.lineTo(midX - 4, spineY + 4.5);
        connectorsLayer
          .append('path')
          .attr('d', chevron.toString())
          .attr('fill', 'none')
          .attr('stroke', GOLD)
          .attr('stroke-width', 1.35)
          .attr('stroke-linecap', 'round')
          .attr('stroke-linejoin', 'round');
      }

      // Draw each stage diamond keystone, drop stem, and architectural frame
      layoutMetrics.forEach((m) => {
        const cardX = m.cx - cardWidth / 2;

        // Vertical drop stem from diamond keystone to stage frame
        connectorsLayer
          .append('line')
          .attr('x1', m.cx)
          .attr('y1', spineY + 12)
          .attr('x2', m.cx)
          .attr('y2', cardTop)
          .attr('stroke', GOLD)
          .attr('stroke-opacity', 0.45)
          .attr('stroke-width', 1.15);

        // Outer ivory halo diamond + solid Antique Gold diamond keystone
        drawDiamond(connectorsLayer, m.cx, spineY, 11, IVORY, GOLD, 1.15);
        drawDiamond(connectorsLayer, m.cx, spineY, 5.5, GOLD);

        const stageGroup = nodesLayer.append('g').attr('class', 'workflow-diagram-stage');

        // Architectural stage frame
        stageGroup
          .append('rect')
          .attr('x', cardX)
          .attr('y', cardTop)
          .attr('width', cardWidth)
          .attr('height', uniformCardHeight)
          .attr('rx', 12)
          .attr('fill', PAPER)
          .attr('fill-opacity', 0.82)
          .attr('stroke', GOLD)
          .attr('stroke-opacity', 0.34)
          .attr('stroke-width', 1);

        // Top Antique Gold architectural hairline accent
        stageGroup
          .append('line')
          .attr('x1', cardX + 20)
          .attr('y1', cardTop + 0.75)
          .attr('x2', cardX + cardWidth - 20)
          .attr('y2', cardTop + 0.75)
          .attr('stroke', GOLD)
          .attr('stroke-opacity', 0.75)
          .attr('stroke-width', 1.5);

        let cursorY = cardTop + cardPadTop + 10;

        // Stage index: 01 / 04
        const indexText = stageGroup
          .append('text')
          .attr('x', cardX + cardPadX)
          .attr('y', cursorY)
          .attr('font-family', HEADING_FONT)
          .attr('font-size', 11)
          .attr('font-weight', 600)
          .attr('letter-spacing', '0.08em');

        indexText.append('tspan').attr('fill', GOLD_DARK).text(m.stage.index);
        indexText.append('tspan').attr('fill', NAVY).attr('fill-opacity', 0.3).text(' / ');
        indexText.append('tspan').attr('fill', SLATE).text('04');

        cursorY += 24;

        // Verbatim Stage Title
        const titleEl = stageGroup
          .append('text')
          .attr('x', cardX + cardPadX)
          .attr('y', cursorY)
          .attr('font-family', HEADING_FONT)
          .attr('font-size', 16)
          .attr('font-weight', 700)
          .attr('letter-spacing', '-0.02em')
          .attr('fill', NAVY);

        m.titleLines.forEach((line, i) => {
          titleEl
            .append('tspan')
            .attr('x', cardX + cardPadX)
            .attr('dy', i === 0 ? 0 : 21)
            .text(line);
        });

        cursorY += (m.titleLines.length - 1) * 21 + 24;

        // Verbatim Stage Summary
        const summaryEl = stageGroup
          .append('text')
          .attr('x', cardX + cardPadX)
          .attr('y', cursorY)
          .attr('font-family', BODY_FONT)
          .attr('font-size', 12.5)
          .attr('font-weight', 400)
          .attr('fill', SLATE);

        m.summaryLines.forEach((line, i) => {
          summaryEl
            .append('tspan')
            .attr('x', cardX + cardPadX)
            .attr('dy', i === 0 ? 0 : 18.5)
            .text(line);
        });

        cursorY += (m.summaryLines.length - 1) * 18.5 + 18;

        // Subtle Antique Gold horizontal rule separating summary from capabilities
        stageGroup
          .append('line')
          .attr('x1', cardX + cardPadX)
          .attr('y1', cursorY)
          .attr('x2', cardX + cardWidth - cardPadX)
          .attr('y2', cursorY)
          .attr('stroke', GOLD)
          .attr('stroke-opacity', 0.25)
          .attr('stroke-width', 1);

        cursorY += 20;

        // Verbatim Supporting Capabilities with miniature Antique Gold diamonds
        m.itemLinesList.forEach((lines) => {
          drawDiamond(stageGroup, cardX + cardPadX + 3, cursorY - 4, 2.5, GOLD);

          const itemText = stageGroup
            .append('text')
            .attr('x', cardX + cardPadX + 13)
            .attr('y', cursorY)
            .attr('font-family', BODY_FONT)
            .attr('font-size', 12)
            .attr('font-weight', 400)
            .attr('fill', INK)
            .attr('fill-opacity', 0.88);

          lines.forEach((line, i) => {
            itemText
              .append('tspan')
              .attr('x', cardX + cardPadX + 13)
              .attr('dy', i === 0 ? 0 : 16.5)
              .text(line);
          });

          cursorY += lines.length * 16.5 + 5.5;
        });

        // Transparent context-menu hit target preserving right-click navigation parity
        if (contextMenuCallbackRef.current) {
          stageGroup
            .append('rect')
            .attr('x', cardX)
            .attr('y', cardTop)
            .attr('width', cardWidth)
            .attr('height', uniformCardHeight)
            .attr('rx', 12)
            .attr('fill', 'transparent')
            .on('contextmenu', (event: MouseEvent) => {
              contextMenuCallbackRef.current?.(
                event as unknown as React.MouseEvent<Element>,
                m.stage.index,
                m.stage.title
              );
            });
        }
      });
    } else {
      // =========================================================================
      // COMPACT / TABLET & MOBILE VERTICAL FLOWCHART (Single Column)
      // =========================================================================
      const svgWidth = 560;
      const spineX = 24;
      const cardX = 54;
      const cardWidth = svgWidth - cardX - 16;
      const cardPadX = 20;
      const cardPadTop = 20;
      const cardPadBottom = 20;
      const rowGap = 24;

      let runningY = 16;

      const verticalMetrics = stages.map((stage) => {
        const titleLines = wrapTextLines(stage.title, 38);
        const summaryLines = wrapTextLines(stage.summary, 60);
        const itemRows = Math.ceil(stage.items.length / 2);

        const height =
          cardPadTop +
          16 + // index
          8 +
          titleLines.length * 22 +
          8 +
          summaryLines.length * 19 +
          14 + // divider gap
          14 + // post-divider
          itemRows * 22 +
          cardPadBottom;

        const top = runningY;
        const nodeY = top + 28;
        runningY += height + rowGap;

        return {
          stage,
          top,
          height,
          nodeY,
          titleLines,
          summaryLines,
        };
      });

      const svgHeight = Math.ceil(runningY - rowGap + 16);

      svg
        .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
        .attr('width', '100%')
        .attr('preserveAspectRatio', 'xMidYMid meet');

      const connectorsLayer = svg.append('g').attr('aria-hidden', 'true');
      const nodesLayer = svg.append('g');

      const verticalLink = d3
        .linkVertical<{ source: [number, number]; target: [number, number] }, [number, number]>()
        .x((d) => d[0])
        .y((d) => d[1]);

      for (let i = 0; i < verticalMetrics.length - 1; i++) {
        const fromY = verticalMetrics[i].nodeY + 12;
        const toY = verticalMetrics[i + 1].nodeY - 12;
        const midY = (fromY + toY) / 2;

        connectorsLayer
          .append('path')
          .attr(
            'd',
            verticalLink({
              source: [spineX, fromY],
              target: [spineX, toY],
            }) ?? ''
          )
          .attr('fill', 'none')
          .attr('stroke', 'url(#antique-gold-spine-grad)')
          .attr('stroke-width', 1.35);

        // Minimal downward Antique Gold chevron
        const chevron = d3.path();
        chevron.moveTo(spineX - 4.5, midY - 3);
        chevron.lineTo(spineX, midY + 3);
        chevron.lineTo(spineX + 4.5, midY - 3);
        connectorsLayer
          .append('path')
          .attr('d', chevron.toString())
          .attr('fill', 'none')
          .attr('stroke', GOLD)
          .attr('stroke-width', 1.35)
          .attr('stroke-linecap', 'round')
          .attr('stroke-linejoin', 'round');
      }

      verticalMetrics.forEach((m) => {
        // Horizontal Antique Gold stem linking spine diamond to stage frame
        connectorsLayer
          .append('line')
          .attr('x1', spineX + 11)
          .attr('y1', m.nodeY)
          .attr('x2', cardX)
          .attr('y2', m.nodeY)
          .attr('stroke', GOLD)
          .attr('stroke-opacity', 0.45)
          .attr('stroke-width', 1.15);

        drawDiamond(connectorsLayer, spineX, m.nodeY, 10, IVORY, GOLD, 1.15);
        drawDiamond(connectorsLayer, spineX, m.nodeY, 5, GOLD);

        const stageGroup = nodesLayer.append('g').attr('class', 'workflow-diagram-stage');

        stageGroup
          .append('rect')
          .attr('x', cardX)
          .attr('y', m.top)
          .attr('width', cardWidth)
          .attr('height', m.height)
          .attr('rx', 12)
          .attr('fill', PAPER)
          .attr('fill-opacity', 0.84)
          .attr('stroke', GOLD)
          .attr('stroke-opacity', 0.34)
          .attr('stroke-width', 1);

        let cursorY = m.top + cardPadTop + 10;

        const indexText = stageGroup
          .append('text')
          .attr('x', cardX + cardPadX)
          .attr('y', cursorY)
          .attr('font-family', HEADING_FONT)
          .attr('font-size', 11.5)
          .attr('font-weight', 600)
          .attr('letter-spacing', '0.08em');

        indexText.append('tspan').attr('fill', GOLD_DARK).text(m.stage.index);
        indexText.append('tspan').attr('fill', NAVY).attr('fill-opacity', 0.3).text(' / ');
        indexText.append('tspan').attr('fill', SLATE).text('04');

        cursorY += 23;

        const titleEl = stageGroup
          .append('text')
          .attr('x', cardX + cardPadX)
          .attr('y', cursorY)
          .attr('font-family', HEADING_FONT)
          .attr('font-size', 17)
          .attr('font-weight', 700)
          .attr('letter-spacing', '-0.02em')
          .attr('fill', NAVY);

        m.titleLines.forEach((line, i) => {
          titleEl
            .append('tspan')
            .attr('x', cardX + cardPadX)
            .attr('dy', i === 0 ? 0 : 22)
            .text(line);
        });

        cursorY += (m.titleLines.length - 1) * 22 + 22;

        const summaryEl = stageGroup
          .append('text')
          .attr('x', cardX + cardPadX)
          .attr('y', cursorY)
          .attr('font-family', BODY_FONT)
          .attr('font-size', 13.5)
          .attr('font-weight', 400)
          .attr('fill', SLATE);

        m.summaryLines.forEach((line, i) => {
          summaryEl
            .append('tspan')
            .attr('x', cardX + cardPadX)
            .attr('dy', i === 0 ? 0 : 19)
            .text(line);
        });

        cursorY += (m.summaryLines.length - 1) * 19 + 16;

        stageGroup
          .append('line')
          .attr('x1', cardX + cardPadX)
          .attr('y1', cursorY)
          .attr('x2', cardX + cardWidth - cardPadX)
          .attr('y2', cursorY)
          .attr('stroke', GOLD)
          .attr('stroke-opacity', 0.25)
          .attr('stroke-width', 1);

        cursorY += 20;

        const colWidth = (cardWidth - cardPadX * 2) / 2;
        m.stage.items.forEach((item, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          const itemX = cardX + cardPadX + col * colWidth;
          const itemY = cursorY + row * 22;

          drawDiamond(stageGroup, itemX + 3, itemY - 4, 2.5, GOLD);

          stageGroup
            .append('text')
            .attr('x', itemX + 13)
            .attr('y', itemY)
            .attr('font-family', BODY_FONT)
            .attr('font-size', 12.5)
            .attr('font-weight', 400)
            .attr('fill', INK)
            .attr('fill-opacity', 0.9)
            .text(item);
        });

        if (contextMenuCallbackRef.current) {
          stageGroup
            .append('rect')
            .attr('x', cardX)
            .attr('y', m.top)
            .attr('width', cardWidth)
            .attr('height', m.height)
            .attr('rx', 12)
            .attr('fill', 'transparent')
            .on('contextmenu', (event: MouseEvent) => {
              contextMenuCallbackRef.current?.(
                event as unknown as React.MouseEvent<Element>,
                m.stage.index,
                m.stage.title
              );
            });
        }
      });
    }
  }, [stages, isCompact]);

  return (
    <figure ref={containerRef} className="py-5 sm:py-6 xl:py-7 m-0">
      <svg
        ref={svgRef}
        role="img"
        aria-labelledby="workflow-diagram-title workflow-diagram-desc"
        className="block w-full h-auto select-none"
      />

      {/* Semantic screen-reader outline preserving full stage and capability hierarchy */}
      <ol className="sr-only" aria-label="Analytical Workflow stages">
        {stages.map((stage) => (
          <li key={stage.id}>
            <h3>
              {stage.index} / 04 — {stage.title}
            </h3>
            <p>{stage.summary}</p>
            <ul>
              {stage.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </figure>
  );
}
