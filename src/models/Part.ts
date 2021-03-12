/* eslint-disable no-use-before-define */
import {
  Model, Schema, model
} from 'mongoose';
import TimeStampPlugin, {
  ITimeStampedDocument
} from './plugins/timestamp-plugin';

export interface IPartDocument extends IPart, ITimeStampedDocument {}

export interface IPart {
  /** Name of the part */
  name: string;
  features: IFeature[];
}

// eslint-disable-next-line no-shadow
export enum ElementState {
  Correct = 'Correct',
  Warning = 'Warning',
  Error = 'Error',
}

export interface IFeature {
  /** Name of the part */
  name: string;
  state: ElementState;
  controls: IControl[];
}

export interface IControl {
  name: string;
  /** deviation from the expected measurement of the control */
  dev: number;
  /** total deviation outside measurement for the last N pieces measured. */
  devOutTotal: number;

  state: ElementState;
}

interface IPartModel extends Model<IPartDocument> { }

const schema = new Schema<IPartDocument>({
  name: { type: String, index: true, required: true },
  features: { type: Array }
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Part: IPartModel = model<IPartDocument, IPartModel>('Part', schema);

export default Part;
