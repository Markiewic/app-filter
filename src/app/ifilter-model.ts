import { IFilterConditionsModel } from './ifilter-conditions-model';

export interface IFilterModel {
    applied: boolean,
    conditions: IFilterConditionsModel
}
