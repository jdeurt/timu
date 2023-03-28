# Timu

> Simple time utilities

## Usage

```ts
import * as t from "timu";

const timeRemaining = t.time(Date.now()).until(someFutureDate);

// "X days and Y.yy hours"
console.log(
    timeRemaining.format({
        significantUnits: [t.Unit.DAY, t.Unit.HOUR],
        minSignificantUnitFractionDigits: 2,
        mode: "long",
    })
);
```

## License

MIT © [Juan de Urtubey](https://jdeurt.xyz)
