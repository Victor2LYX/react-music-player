/**
 * Created by lyx on 2017/12/3.
 */
export function randomRange(under, over) {
    return Math.ceil(Math.random() * (over - under) + under);
}
