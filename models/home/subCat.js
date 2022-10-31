let Accessories = [
  { type: "Screw Drivers" },
  { type: "Connecting Wires" },
  { type: "Switches" },
  { type: "Pliers" },
  { type: "Soldering Tools" },
  { type: "Others" },
];
let Batteries = [
  { type: "Lithium Rechargeable" },
  { type: "Lithium Non Rechargeable" },
  { type: "Lead Acid Cells" },
  { type: "Alkaline Cells" },
  { type: "Nickel Cells" },
  { type: "Others" },
];
let Inductors = [
  { type: "Iron Cores" },
  { type: "Air Cores" },
  { type: "Ferrite Core" },
  { type: "Wires" },
  { type: "Coils" },
  { type: "Others" },
];
let ICs = [
  { type: "Timers" },
  { type: "Comparators" },
  { type: "Linear IC's" },
  { type: "Micro Controllers" },
  { type: "Multiplexers" },
  { type: "Others" },
];
let Modules = [
  { type: "Charger Modules" },
  { type: "Boost Converters" },
  { type: "Bulk Converters" },
  { type: "Transmitters" },
  { type: "Micro Controllers" },
  { type: "Others" },
];
let Diodes = [
  { type: "Zener Diodes" },
  { type: "Schottky Diodes" },
  { type: "Light Emitting Diodes" },
  { type: "Rectifyind Diode" },
  { type: "Silicon Controlled Rectifier" },
  { type: "Others" },
];
let SemiConductors = [
  { type: "NPN Transistors" },
  { type: "PNP Transistors" },
  { type: "Mosfets" },
  { type: "Thyristors" },
  { type: "Voltage Regulators" },
  { type: "Others" },
];
let Capacitors = [
  { type: "Fixed Capacitors" },
  { type: "Variable Capacitors" },
  { type: "Mica Capacitors" },
  { type: "Electrolytic Capacitors" },
  { type: "Polyester Capacitors" },
  { type: "Others" },
];
let Resistors = [
  { type: "Fixed Resistors" },
  { type: "Variable Resistors" },
  { type: "Thermistors" },
  { type: "Photo Resistors" },
  { type: "Potentiometers" },
  { type: "Others" },
];

module.exports = {
  subCategory: (sub) => {
    if (sub == "Accessories") return [...Accessories];
    if (sub == "Resistors") return [...Resistors];
    if (sub == "Capacitors") return [...Capacitors];
    if (sub == "SemiConductors") return [...SemiConductors];
    if (sub == "Diodes") return [...Diodes];
    if (sub == "Modules") return [...Modules];
    if (sub == "ICs") return [...ICs];
    if (sub == "Batteries") return [...Batteries];
    if (sub == "Inductors") return [...Inductors];
  },
};
