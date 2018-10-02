export class Calculator {

    constructor(private container: any){
        this.container.addEventListener('click', this.displayNumber);
    };

    public displayNumber(event: any) {
        alert(event.srcElement.value);

    }

}


