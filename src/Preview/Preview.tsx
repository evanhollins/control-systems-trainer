import React, { useCallback, useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

type PreviewProps = {
    draw: (p5: p5Types) => void;
}

function Preview(props: PreviewProps) {
    const [ width, setWidth ] = useState(0);
    const [ height, setHeight ] = useState(0);

    const measuredDiv = useCallback(node => {
        if (node !== null && width === 0 && height === 0) {
            let height = node.getBoundingClientRect().height;
            let width = node.getBoundingClientRect().width;
            let style = getComputedStyle(node);

            height -= parseInt(style.marginTop) + parseInt(style.marginBottom) +
                        parseInt(style.paddingTop) + parseInt(style.paddingBottom);
            width -= parseInt(style.marginLeft) + parseInt(style.marginRight) +
                        parseInt(style.paddingLeft) + parseInt(style.paddingRight);

            setHeight(Math.floor(height));
            setWidth(Math.floor(width));
        }
    }, [height, width]);

    const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(width, height).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
        props.draw(p5);
	};

	return (
        <div style={{width: "95%", height: "95%", margin: "10px", padding: "0px"}} ref={measuredDiv}>
            {
                height !== 0 && width !== 0
                    ? <Sketch setup={setup} draw={draw} />
                    : <div/>
            }
        </div>
    );
}

export default Preview;
