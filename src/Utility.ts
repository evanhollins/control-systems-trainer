
export function clamp(x: number, min: number, max: number) {
    if (x < min) {
        return min;
    } else if (x > max) {
        return max;
    }

    return x;
}

export function angleToCoordinate(angle: number, radius: number): {x: number, y: number} {
    let x = radius * Math.cos(angle);
    let y = radius * Math.sin(angle);

    return {x, y};
}