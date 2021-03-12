import Part, {
  IPart, ElementState, IFeature, IControl
} from '../Part';

export const PartsData: IPart[] = [
  {
    name: 'Part 1',
    features: [
      {
        name: 'Feature 1.1',
        state: ElementState.Correct,
        controls: [{
          dev: 1,
          devOutTotal: 1,
          name: 'X',
          state: ElementState.Correct
        },
        {
          dev: 1,
          devOutTotal: 1,
          name: 'Y',
          state: ElementState.Correct
        }]
      },
      {
        name: 'Feature 1.2',
        state: ElementState.Correct,
        controls: [{
          dev: 1,
          devOutTotal: 1,
          name: 'X',
          state: ElementState.Warning
        },
        {
          dev: 1,
          devOutTotal: 1,
          name: 'Y',
          state: ElementState.Error
        }]
      }]
  }
];

export function generateRandomPart(): IPart {
  const numberOfFeatures = Random(10);
  // const numberOfFeatures = 5;
  const part: IPart = {
    name: 'Part 1',
    features: EmptyArrayFilled(numberOfFeatures).map(_ => generateRandomFeature())
  };

  return part;
}

const Random = (range: number) => Math.floor(Math.random() * range);
// eslint-disable-next-line max-len
const RandomState = () => ([ElementState.Correct, ElementState.Warning, ElementState.Error])[Random(3)];
const EmptyArrayFilled = (N: number) => Array.from({ length: N }, (_, index) => undefined);

function generateRandomFeature(): IFeature {
  const featureNumber = Random(10);
  const numberOfControls = Random(10);
  const feature: IFeature = {
    name: `Feature ${featureNumber}`,
    state: RandomState(),
    controls: EmptyArrayFilled(numberOfControls).map(_ => generateRandomControl())
  };

  return feature;
}

function generateRandomControl(): IControl {
  const controlNumber = Random(10);
  const control: IControl = {
    name: `Control ${controlNumber}`,
    state: RandomState(),
    dev: Random(100),
    devOutTotal: Random(100)
  };

  return control;
}

export const createTestData = async () => {
  const partsDB = await Part.find();
  // we don't create new data if its already created
  if (partsDB.length > 0) {
    return;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const part of PartsData) {
    const partDB = new Part(part);
    // eslint-disable-next-line no-await-in-loop
    await partDB.save();
  }
};
