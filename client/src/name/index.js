import Crystal from 'random-crystal-generator';

const crystalGetter = new Crystal();
//get a random crystal
export const getACrystal = () => crystalGetter.name;


