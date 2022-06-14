interface IMediaQuery {
  [key: string]: string;
}

const mq = {} as IMediaQuery;

const breakPoints = [480, 768, 1024, 1200];
const bpName = ['mobile', 'tablet', 'small', 'large'];

breakPoints.forEach((bp, i) => {
  mq[bpName[i]] = `@media (max-width: ${bp}px)`;
});

export default mq;
