# Performance Profiling

## Before optimization

### Changing year before optimization

- Commit Duration: 194.8ms
- Render Duration: 299.9ms, Table - 105.7ms, YearSelector - 19.1ms
- Interactions: change year 2023 -> 2005
- Flame Graph:
![screenshot](https://i.ibb.co/9k9cLyC5/image.png)
- Ranked Chart:
![screenshot](https://i.ibb.co/dJP2GmHM/image.png)

### Sort before optimization

- Commit Duration: 46.3ms
- Render Duration: 284.5ms, Table - 99.8ms, YearSelector - 17.1ms
- Interactions: apply sort by country asc -> desc
- Flame Graph:
![screenshot](https://i.ibb.co/ymVbcH5T/image.png)
- Ranked Chart:
![screenshot](https://i.ibb.co/GbvK7vr/image.png)

### Search before optimization

- Commit Duration: 81.2ms
- Render Duration: 29.7ms, Table - 2ms, YearSelector - 16.5ms
- Interactions: search for `bel`
- Flame Graph:
![screenshot](https://i.ibb.co/mrmBJYh3/image.png)
- Ranked Chart:
![screenshot](https://i.ibb.co/d4th7kt7/image.png)

### Adding optional columns before optimization

- Commit Duration: 18.4ms
- Render Duration: 268.8ms, Table - 91.9ms, YearSelector - 17.1ms
- Interactions: open modal, check 'methane', close modal
- Flame Graph:
![screenshot](https://i.ibb.co/cS2DHZKM/image.png)
- Ranked Chart:
![screenshot](https://i.ibb.co/5XMQjCD0/image.png)

### Goals

Initial profiling shows that the Table component is the main source of performance load. Any interaction that results in data recalculation (year change, sorting, etc.) causes a long re-render of the Table component (around 100 ms). This is because all the logic of filtering, mapping and sorting the 100 MB dataset is re-executed on each render, even if a minor parameter has changed that does not affect the result. The goal of optimization is to prevent these expensive calculations and re-renders when they are not necessary.

## After optimization

### Changing year after optimization

- Commit Duration: 211.3ms
- Render Duration: 317.1ms, Table - 140.7ms, YearSelector - 23.7ms
- Interactions: change year 2023 -> 2005
- Flame Graph:
![screenshot](https://i.ibb.co/RpK2sHvc/image.png)
- Ranked Chart:
![screenshot](https://i.ibb.co/hnGJmsX/image.png)

### Sort after optimization

- Commit Duration: 30.2ms
- Render Duration: 140.5ms, Table - 126.1ms, YearSelector - **NOT RE-RENDERED**
- Interactions: apply sort by country asc -> desc
- Flame Graph:
![screenshot](https://i.ibb.co/bjXzyRbx/image.png)
- Ranked Chart:
![screenshot](https://i.ibb.co/Zp9b67Zd/image.png)

### Search after optimization

- Commit Duration: 70.2ms
- Render Duration: 9.2ms, Table - 2.5ms, YearSelector - **NOT RE-RENDERED**
- Interactions: search for `bel`
- Flame Graph:
![screenshot](https://i.ibb.co/NgcwS9n5/image.png)
- Ranked Chart:
![screenshot](https://i.ibb.co/tMvfLQmX/image.png)

### Adding optional columns after optimization

- Commit Duration: 10.5ms
- Render Duration: 224.2ms, Table - **NOT RE-RENDERED**, YearSelector - **NOT RE-RENDERED**
- Interactions: open modal, check 'methane', close modal
- Flame Graph:
![screenshot](https://i.ibb.co/Pv9yjwpD/image.png)
- Ranked Chart:
![screenshot](https://i.ibb.co/tpLn3wTw/image.png)

### Conclusion

After applying optimizations using `useMemo`, `useCallback` and `React.memo` hooks, the overall performance and responsiveness of the application has improved.

The key result was the prevention of unnecessary re-renders of the heavy Table component. For interactions that do not affect the table data (for example, opening a modal window to select columns), Table is now not re-rendered at all, which saves nearly 100ms on each action. In addition, in almost all interactions, we completely get rid of unnecessary re-rendering of the YearSelector component. This was achieved thanks to `React.memo` and stabilizing props with useCallback.

An interesting observation was that for operations that require recalculation of data (year change, sorting), the rendering time of the Table component itself increased slightly. This is expected behavior due to the overhead of the useMemo hook for checking dependencies. However, this small "price" is completely compensated by performance savings in other scenarios.
