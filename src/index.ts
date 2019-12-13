import easingFunctions, { EasingFunctions } from '@tolkam/lib-easing-functions';

/**
 * @param {TDirection} direction
 * @param {HTMLElement | Element} element
 * @param {number} to
 * @param {number} duration
 * @param {TEasing} easing
 * @param {Function} callback
 */
function scrollTo(
    direction: TDirection,
    element: HTMLElement | Element,
    to: number,
    duration?: number,
    easing?: TEasing,
    callback?: Function
) {

    duration = duration || 0;
    to = to > 0 ? to : 0;
    const start = Date.now();
    const scrollProp = 'scroll' + direction;
    const easingFunction = easing ? easingFunctions[easing] : null;
    const currentScroll = element[scrollProp];

    // nothing to animate
    if (duration === 0 || !easingFunction || currentScroll === to) {
        element[scrollProp] = to;
        callback && callback();
        return;
    }

    const scroll = () => {
        const timeDiff = Date.now() - start;
        const time = timeDiff > 0 ? Math.min(1, timeDiff / (duration || 0)) : 0;
        const easedTime = easingFunction(time);

        element[scrollProp] = Math.round(easedTime * (to - currentScroll) + currentScroll);

        if (time < 1) {
            requestAnimationFrame(scroll);
        } else {
            callback && callback();
        }
    };

    requestAnimationFrame(scroll);
}

export default scrollTo;
export { easingFunctions }
export type TDirection = 'Top' | 'Left';
export type TEasing = keyof EasingFunctions;