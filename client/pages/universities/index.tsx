import Head from 'next/head'
import React from 'react'
import axios from 'axios'

type UniversityDataState = {
    universities: Array<{name:string, logo: string, residences: any}>,
    message: string
}



class Universities extends React.Component<{}, UniversityDataState> {
    api: any
    constructor(props:any){
        super(props)
        this.state = {
            universities:[],
            message:"Not working"
        }
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
          });
    }  
    
    async componentDidMount() {
        try {
            const response = await this.api.get('/api/hello')
            const uniData = response.data.message;
            console.log(response.data)
            
            this.setState({message: uniData})
        }

        catch(e){
            this.setState({message: "failed"})
        }
    }

    render() {
        const {message} = this.state
        return(
            <>
                <Head>
                    <title>Universities | Residence Rater</title>
                    <meta
                        name = "description"
                        content = "Explore a list of universities ready for residence rating. Get insights and reviews on University accomodations"
                    />
                </Head>
                <div>
                    <h1 className = "text-xl text-black"></h1>
                </div>
            </>
        )
    }
}

export default Universities