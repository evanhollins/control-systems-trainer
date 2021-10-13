
export function clamp(x: number, min: number, max: number) {
    if (x < min) {
        return min;
    } else if (x > max) {
        return max;
    }

    return x;
}