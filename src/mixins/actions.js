import Helpers from "@/helper/helpers";

const elForms = ['circle', 'square', 'triangle']
let leftEls = []
let rightEls = []
export default () => {
    return {
        methods: {
            addItem(ev, position) {
                const windowWidth = window.innerWidth / 2
                const clickPosition = ev.clientX.toFixed(0)
                let side = ''
                let KKD = 0
                let weight = Helpers.randomIntFromInterval(1, 10)
                if (!position) {
                    if (Number(clickPosition) < windowWidth) {
                        side = 'left'
                        KKD = ((windowWidth - clickPosition) / windowWidth).toFixed(2) * 1
                    } else {
                        side = 'right'
                        KKD = (Math.abs(windowWidth - clickPosition) / windowWidth).toFixed(2) * 1
                    }
                } else {
                    side = position
                    if (side === 'left') KKD = ((windowWidth - clickPosition) / windowWidth).toFixed(2) * 1
                    else KKD = (Math.abs(windowWidth - clickPosition) / windowWidth).toFixed(2) * 1
                }
                const form = elForms[Helpers.randomIntFromInterval(0, 2)]
                const triangle = Helpers.triangleGenerator(weight * 10, Helpers.getRandomColor());
                const style = {
                    position: 'absolute',
                    left: ev.offsetX + 'px',
                    backgroundColor: Helpers.getRandomColor(),
                    top: ev.offsetY + 'px',
                    width: weight * 10 + 'px',
                    height: weight * 10 + 'px'
                }
                let obj = {
                    label: weight,
                    weight: weight * KKD,
                    side: side,
                    triangleHeight: form === 'triangle' ? weight * 10 : null,
                    className: side + ' ' + form,
                    id: this.itemsArr.length ? this.itemsArr.length + 1 : 1,
                    style: form === 'triangle' ? {
                        position: 'absolute',
                        left: ev.offsetX + 'px',
                        top: ev.offsetY + 'px',
                        borderColor: triangle.borderColor,
                        borderStyle: triangle.borderStyle,
                        borderWidth: triangle.borderWidth,
                        width: 0,
                        height: 0
                    } : style
                }
                this.itemsArr.push(obj)
                this.$store.dispatch('addItems', this.itemsArr)
                this.addAnimation(obj)
            },
            addAnimation(obj) {
                const indexObj = this.itemsArr.findIndex(item => item.id === obj.id)
                let pos = (this.itemsArr[indexObj].style.top.replace('px', '') * 1).toFixed(0) * 1
                const elHeight = obj.triangleHeight ? obj.triangleHeight : obj.style.height.replace('px', '') * 1
                let a = setInterval(() => {
                    if ((this.lineTopPosition - elHeight) < pos) {
                        if (obj.side === 'left') leftEls.push(obj.weight)
                        else rightEls.push(obj.weight)
                        this.compareValue()
                        clearInterval(a)
                    } else this.itemsArr[indexObj].style.top = pos++ + 'px'
                }, 10)
            },
            compareValue() {
                if (leftEls.length && rightEls.length) {
                    this.leftWeight = leftEls.reduce((a, b) => a + b)
                    this.rightWeight = rightEls.reduce((a, b) => a + b)
                    if (this.leftWeight > this.rightWeight) {
                        const deg = (this.leftWeight - this.rightWeight) * -10
                        this.lineRotate = `transform:rotate(${deg < 75 ? deg : 75}deg)`
                    }
                    if (this.leftWeight === this.rightWeight) {
                        this.lineRotate = 'transform:rotate(0deg)'
                    }
                    if (this.leftWeight < this.rightWeight) {
                        const deg = (this.rightWeight - this.leftWeight) * 10
                        this.lineRotate = `transform:rotate(${deg < 75 ? deg : 75}deg)`
                    }
                }
            },
        }
    }
}
