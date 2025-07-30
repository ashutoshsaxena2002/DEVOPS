import axios from "axios";
import { useEffect, useState } from "react";

const Component1 = () => {

    const [data1, setData1] = useState("");
    const [data2, setData2] = useState("");

    console.log("TEST",process.env.REACT_APP_MICROSERVICE1_API_BASE_URL,process.env.REACT_APP_MICROSERVICE2_API_BASE_URL)

    const getDataFromMicroservice1 = async() => {
        let data = await axios.get(`${process.env.REACT_APP_MICROSERVICE1_API_BASE_URL}/getDataFromMicroservice1`)
            .then((res) => { setData1(res?.data)})
            .catch((error)=>{console.log(error)});
    }

    const getDataFromMicroservice2= async() => {
        let data = await axios.get(`${process.env.REACT_APP_MICROSERVICE2_API_BASE_URL}/getDataFromMicroservice2`)
            .then((res) => { setData2(res?.data)})
            .catch((error)=>{console.log(error)});
    }

    useEffect(() => {
        getDataFromMicroservice1();
        getDataFromMicroservice2();
    },[])

    return (
        <>
            {"THIS IS UI SERVICE RUNNING"}
            <br></br>
            {data1}
            <br></br>
            {data2}
        </>
    );
    
}

export default Component1;