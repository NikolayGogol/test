export default class Helpers {
    static randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static onlyNumb(str) {
        const start = str.indexOf('(')
        const end = str.indexOf(')')
        return (str.slice(start + 1, end).replace('deg', '') * 1).toFixed(2)
    }

    static triangleGenerator(size, color) {
        return {
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: `0 ${size}px ${size}px ${size}px`,
            borderColor: `transparent transparent ${color} transparent`
        }
    }
}