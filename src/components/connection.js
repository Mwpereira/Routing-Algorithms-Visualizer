import React, {useState} from "react";

const Connection = ({
                        startNode,
                        endNode,
                        weight,
                        selected,
                        onSelect,
                    }) => {
    const x1 = startNode.x + 25;
    const y1 = startNode.y + 25;
    const x2 = endNode.x + 25;
    const y2 = endNode.y + 25;

    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;

    const angle = Math.atan2(y2 - y1, x2 - x1);

    return (
        <>
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={selected ? "#f71a1a" : "#ccc"}
                strokeWidth="3"
                onClick={onSelect}
            />
            <g onClick={onSelect}>
                <rect
                    x={cx - 16}
                    y={cy - 16}
                    width="32"
                    height="32"
                    rx="4"
                    ry="4"
                    fill="white"
                    stroke="black"
                    strokeWidth="1"
                />
                <text
                    x={cx}
                    y={cy}
                    dy=".3em"
                    textAnchor="middle"
                    cursor="pointer"
                    fontSize={"1.2em"}
                    fontWeight={selected ? "bold" : "600"}
                >
                    {weight}
                </text>
            </g>
            {selected && (
                <g transform={`translate(${cx}, ${cy}) rotate(${angle * (180 / Math.PI)})`}>
                    <rect
                        x="-10"
                        y="-10"
                        width="20"
                        height="20"
                        fill="transparent"
                    />
                </g>
            )}
        </>
    );
};

export default Connection;
