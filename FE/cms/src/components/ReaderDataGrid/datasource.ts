export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

type DataIndex = keyof DataType;

export const data: DataType[] = [
  {
    key: '1',
    name: 'Dũng',
    age: 32,
    address: 'Thạch Thất',
  },
  {
    key: '2',
    name: 'Thắng',
    age: 42,
    address: 'Đông Ti Mo',
  },
  {
    key: '3',
    name: 'Hiếu',
    age: 32,
    address: 'Thanh Hóa',
  },
  {
    key: '4',
    name: 'Hải',
    age: 32,
    address: 'Gầm cầu',
  },
  {
    key: '5',
    name: 'Hải',
    age: 32,
    address: 'Gầm cầu',
  },
  {
    key: '6',
    name: 'Hải',
    age: 32,
    address: 'Gầm cầu',
  },
  {
    key: '7',
    name: 'Hải',
    age: 32,
    address: 'Gầm cầu',
  },
  {
    key: '8',
    name: 'Hải',
    age: 32,
    address: 'Gầm cầu',
  },
  {
    key: '9',
    name: 'Hải',
    age: 32,
    address: 'Gầm cầu',
  },
  {
    key: '10',
    name: 'Hải',
    age: 32,
    address: 'Gầm cầu',
  },
  {
    key: '11',
    name: 'Hải',
    age: 32,
    address: 'Gầm cầu',
  },
  {
    key: '12',
    name: 'Hải',
    age: 32,
    address: 'Gầm cầu',
  },
  {
    key: '13',
    name: 'Hải',
    age: 32,
    address: 'Gầm cầu',
  },
  {
    key: '14',
    name: 'Hải',
    age: 32,
    address: 'Gầm cầu',
  },
  {
    key: '15',
    name: 'Hải',
    age: 32,
    address: 'Gầm cầu',
  },
];