import test from "ava";

import * as timu from "../src";

test("should be a time helper", (t) => {
    const n = 3 * timu.Unit.MONTH + 15 * timu.Unit.DAY;

    const time = timu.time(n);

    t.is(time.inDays, 105);
    t.is(time.inHours, n / timu.Unit.HOUR);
    t.is(time.inMilliseconds, n / timu.Unit.MILLISECOND);
    t.is(time.inMinutes, n / timu.Unit.MINUTE);
    t.is(time.inMonths, n / timu.Unit.MONTH);
    t.is(time.inSeconds, n / timu.Unit.SECOND);
    t.is(time.inWeeks, n / timu.Unit.WEEK);
    t.is(time.inYears, n / timu.Unit.YEAR);
});
