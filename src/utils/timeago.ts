export default function timeago(date: string | number | Date, short: boolean | undefined = undefined) {
    const obj = {
        second: 1000,
        minute: 60 * 1000,
        hour: 60 * 1000 * 60,
        day: 24 * 60 * 1000 * 60,
        week: 7 * 24 * 60 * 1000 * 60,
        month: 30 * 24 * 60 * 1000 * 60,
        year: 365 * 24 * 60 * 1000 * 60,
    }

    let { round } = Math,
        dir = ' ago',
        pl = function (v: string, n: number) {
            return (short === undefined) ? `${n} ${v + (n > 1 ? 's' : '') + dir}` : n + v.substring(0, 1)
        },
        ts = Date.now() - new Date(date).getTime();
    let ii;

    if (ts < 0) {
        ts *= -1;
        dir = ' from now';
    }

    for (var i in obj) {
        // @ts-ignore
        if (round(ts) < obj[i]) return pl(ii || 'm', round(ts / (obj[ii] || 1)))
        ii = i;
    }
    // @ts-ignore
    return pl(i, round(ts / obj[i]));
}