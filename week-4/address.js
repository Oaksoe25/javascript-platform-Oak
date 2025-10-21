const putri = {
  name: "Putri",
  birthday: "2005-02-13",
  phone: "081234567890",
  address: {
    primary: "Bandung",
    secondary: "Sukabumi"
  }
};

// Shallow copy using Object.assign
const bayu = structuredClone(putri);
bayu.name = "Bayu";
bayu.address.primary = "Aceh";

console.log(putri.address.primary); 
console.log(bayu.address.primary);  
 
