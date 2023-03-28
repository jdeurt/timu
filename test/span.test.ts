import test from "ava";

import * as timu from "../src";

test("should be a timespan helper", (t) => {
    const now = Date.now();

    const span = timu.time(now).spanTo(now + timu.Unit.DAY * 15);
    const overlappingSpan = timu.span(
        now + timu.Unit.DAY * 10,
        now + timu.Unit.DAY * 20
    );
    const nonOverlappingSpan = timu.span(
        now + timu.Unit.DAY * 16,
        now + timu.Unit.DAY * 20
    );

    t.is(span.contains(now + timu.Unit.DAY * 10), true);
    t.is(span.contains(now + timu.Unit.DAY * 16), false);
    t.is(span.overlaps(overlappingSpan), true);
    t.is(span.overlaps(nonOverlappingSpan), false);
    t.is(span.start.inMilliseconds, now);
    t.is(span.end.inMilliseconds, now + timu.Unit.DAY * 15);
});
