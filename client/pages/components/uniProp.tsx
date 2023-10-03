import React from "react";

interface university {
  key: number;
  name: string;
  logo: string;
  residences: any[];
}

class UniProp extends React.Component<university> {
  constructor(props: university) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="card bg-base-100 w-48 h-70 md:w-80 shadow-xl">
          <figure className="p-10 md:p-0 md:pt-10 md:px-10">
            <img src={this.props.logo} alt="logo" className="h-60" />
          </figure>
          <div className="card-body items-center text-center hidden md:flex">
            <h2 className="card-title">{this.props.name}</h2>
          </div>
        </div>
      </>
    );
  }
}

export default UniProp;
