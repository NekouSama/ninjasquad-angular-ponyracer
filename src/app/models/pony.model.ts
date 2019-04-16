export interface PonyModel extends PonyWithPositionModel {
  id: number;
  name: string;
  color: string;
}

export interface PonyWithPositionModel {
  position: number
}
