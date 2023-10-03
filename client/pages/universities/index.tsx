import Head from "next/head";
import React from "react";
import axios from "axios";
import UniProp from "../../components/uniProp";

type UniversityDataState = {
  universities: Array<{ name: string; logo: string; residences: any }>;
  message: string;
};

class Universities extends React.Component<{}, UniversityDataState> {
  api: any;
  constructor(props: any) {
    super(props);
    this.state = {
      universities: [],
      message: "Not working",
    };
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  }

  async componentDidMount() {
    try {
      const response = await this.api.get("/api/get_university");
      const universities = response.data.universities;
      console.log(response.data);

      this.setState({ universities: universities, message: "working" });
    } catch (e) {
      this.setState({ message: "failed" });
    }
  }

  render() {
    const { message, universities } = this.state;
    console.log(message);
    return (
      <>
       
          <div className="flex flex-col w-4/5 mx-auto items-center justify-center p-10 space-y-10 sm:space-y-0 sm:space-x-10 sm:flex-row fadeLonger">
          {universities.map((uni, index) => (
              <>
                <UniProp
                  key={index}
                  name={uni.name}
                  logo={uni.logo}
                />
              </>
            ))}
          </div>
      </>
    );
  }
}

export default Universities;
