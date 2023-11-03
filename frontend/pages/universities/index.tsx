import Head from "next/head";
import React from "react";
import UniProp from "@/components/university/uniProp";
import api from "@/auth/api";
import { UniversityDataState } from "@/data/state";

class Universities extends React.Component<{}, UniversityDataState> {
  constructor(props: any) {
    super(props);
    this.state = {
      universities: [],
      message: "Not working",
    };
  
  }

  async componentDidMount() {
    try {
      const response = await api.get("get_university");
      const universities = response.data.universities;

      this.setState({ universities: universities, message: "working" });
    } catch (e) {
      this.setState({ message: "failed" });
    }
  }

  render() {
    const { universities } = this.state;
    return (
      <div className="w-full flex flex-wrap justify-center items-center m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-x-10 lg:gap-x-20 gap-y-10 mx-auto fadeLonger p-10">
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
      </div>
    );
  }
}

export default Universities;
