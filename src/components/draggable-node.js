import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";

const DraggableNode = ({
                           nodeId,
                           x,
                           y,
                           onDrag,
                           selected,
                           onClick,
                       }) => {
    const nodeRef = useRef(null);

    useEffect(() => {
        $(nodeRef.current).draggable({
            containment: "parent",
            grid: [50, 50],
            drag: function (event, ui) {
                onDrag(ui.position.left, ui.position.top);
            },
        });
    }, [onDrag]);

    return (
        <div
            className="DraggableNode"
            ref={nodeRef}
            style={{
                left: x,
                top: y,
                backgroundColor: selected ? "lightblue" : "#fff",
            }}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClick(!selected);
            }}
        >
            <span>{nodeId}</span>
        </div>
    );
};

export default DraggableNode;
