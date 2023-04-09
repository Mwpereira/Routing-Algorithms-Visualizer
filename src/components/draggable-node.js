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
            drag: function (event, ui) {
                onDrag(ui.position.left, ui.position.top);
            },
            grid: [50, 50],
        });
    }, [onDrag]);

    return (
        <div
            className="DraggableNode"
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClick(!selected);
            }}
            ref={nodeRef}
            style={{
                backgroundColor: selected ? "lightblue" : "#fff",
                left: x,
                top: y,
            }}
        >
            <span>{nodeId}</span>
        </div>
    );
};

export default DraggableNode;