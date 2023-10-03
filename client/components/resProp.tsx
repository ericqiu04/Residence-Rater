import { Component } from "react";

interface resProp {
    resName: string
    resImageLink: any
}


class ResProp extends Component<resProp,{}> {
    constructor(props: resProp){
        super(props)
    }

    render(){
        return(
            <div>
                
            </div>
        )
    }
}

export default ResProp