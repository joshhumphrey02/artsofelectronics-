const data = require('../../data.json');

module.exports = {
  subCategory: (sub) => {
    if (sub == "Accessories") return [...data.Accessories];
    else if (sub == "Resistors") return [...data.Resistors];
    else if (sub == "Capacitors") return [...data.Capacitors];
    else if (sub == "Semi-Conductors") return [...data.SemiConductors];
    else if (sub == "Diodes") return [...data.Diodes];
    else if (sub == "Modules") return [...data.Modules];
    else if (sub == "IC's") return [...data.ICs];
    else if (sub == "Batteries") return [...data.Batteries];
    else if (sub == "Inductors") return [...data.Inductors];
  },
};
