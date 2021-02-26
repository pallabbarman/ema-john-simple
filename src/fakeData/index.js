import androids from './android';
import cameras from './camera';
import laptops from './laptop';

const fakeData = [...androids, ...cameras, ...laptops];

const shuffle = (a) => {
    for (let i = a.length; i; i -= 1) {
        const j = Math.floor(Math.random() * i);
        const b = a;
        [b[i - 1], b[j]] = [b[j], b[i - 1]];
    }
};

shuffle(fakeData);

export default fakeData;
