import { http, HttpResponse } from "msw";

import { app } from "@/constants/configs";
import { generateId } from "@/utilities/uid";

import { type Atom } from "../resources/atoms";

const atoms: Atom[] = [
  { id: generateId(), number: 6, name: "Carbon", symbol: "C", mass: 12.011 },
  { id: generateId(), number: 7, name: "Nitrogen", symbol: "N", mass: 14.007 },
  { id: generateId(), number: 39, name: "Yttrium", symbol: "Y", mass: 88.906 },
  { id: generateId(), number: 56, name: "Barium", symbol: "Ba", mass: 137.33 },
  { id: generateId(), number: 58, name: "Cerium", symbol: "Ce", mass: 140.12 },
];

export default [
  http.get(`${app.apiUrl}/atoms`, () => HttpResponse.json(atoms)),
];
