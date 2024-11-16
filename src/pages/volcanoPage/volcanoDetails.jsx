import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Map, Marker } from "pigeon-maps";
import { GiSummits, GiEruption, GiMountaintop } from "react-icons/gi";
import { BiWorld, BiMapAlt, BiMap } from "react-icons/bi";
import getUserToken from "../../utils/auth/getUserToken";
import BarChart from "./chart";

const Volcano = () => {
    const location = useLocation();
    const data = location.state;
    const [volcanoDetails, setVolcanoDetails] = useState(null);
    const userToken = getUserToken();
    const [displayChart, setDisplayChart] = useState(false);

    // Get the selected volcano data
    const getVolcanoInfo = () => {
        let request = { method: "GET", headers: { "Content-Type": "application/json" } };

        // Check the user login status and define the request
        if (userToken !== null) {
            request = { method: "GET", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${userToken}` } };
        }

        fetch(`http://4.237.58.241:3000/volcano/${data.id}`, request)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                data.latitude = parseFloat(data.latitude);
                data.longitude = parseFloat(data.longitude);
                setVolcanoDetails(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const handleChartDisplay = () => {
        setDisplayChart(true);
      
        // Delay the scroll action slightly
        setTimeout(() => {
          const destination = document.getElementById('chart');
          destination.scrollIntoView({ behavior: 'smooth' });
        }, 10); 
      };
      

    useEffect(() => {
        getVolcanoInfo();
    }, []);

    return (
        <div>
            {volcanoDetails && (
                <>
                    <div className={`${userToken && userToken !== null ? 'px-12 py-10 h-full place-content-center' : 'px-12 h-[90vh] place-content-center'} `}>
                        <div className="grid grid-cols-5 gap-4">
                            <div className="col-span-2 dark:text-white">
                                <h1 className="text-4xl font-bold py-8 text-[#01A982]">{volcanoDetails.name}</h1>
                                <div className="flex text-xl mb-2">
                                    <BiWorld className="my-auto mr-2" />
                                    <span className="text-xl mr-2">Country: </span>
                                    <span className="text-xl font-medium">{volcanoDetails.country}</span>
                                </div>
                                <div className="flex text-xl mb-2">
                                    <BiMapAlt className="my-auto mr-2" />
                                    <span className="text-xl mr-2">Region: </span>
                                    <span className="text-xl font-medium">{volcanoDetails.region}</span>
                                </div>
                                <div className="flex text-xl mb-2">
                                    <BiMap className="my-auto mr-2" />
                                    <span className="text-xl mr-2">Subregion: </span>
                                    <span className="text-xl font-medium">{volcanoDetails.subregion}</span>
                                </div>
                                <div className="flex text-xl mb-2">
                                    <GiEruption className="my-auto mr-2" />
                                    <span className="text-xl mr-2">Last Eruption: </span>
                                    <span className="text-xl font-medium">{volcanoDetails.last_eruption}</span>
                                </div>
                                <div className="flex text-xl mb-2">
                                    <GiSummits className="my-auto mr-2" />
                                    <span className="text-xl mr-2">Summit: </span>
                                    <span className="text-xl font-medium mr-2">{volcanoDetails.summit}</span>
                                    <span className="text-xl font-medium">m</span>
                                </div>
                                <div className="flex text-xl mb-2">
                                    <GiMountaintop className="my-auto mr-2" />
                                    <span className="text-xl mr-2">Elevation: </span>
                                    <span className="text-xl font-medium mr-2">{volcanoDetails.elevation}</span>
                                    <span className="text-xl font-medium">ft</span>
                                </div>
                                {userToken !== null && (
                                    <div className="flex text-xl absolute py-20">
                                        <button onClick={handleChartDisplay} className='px-6 py-2 bg-[#17EBA0] dark:bg-[#008567] hover:bg-[#01A982] hover:ring hover:ring-[#01A9824D] hover:text-[#F7F7F7] text-[#444444] dark:text-white font-semibold rounded-lg'>View More</button>
                                    </div>
                                )}
                            </div>
                            <div className="rounded h-[80vh] col-span-3">
                                <Map defaultCenter={[volcanoDetails.latitude, volcanoDetails.longitude]} defaultZoom={10}>
                                    <Marker width={50} color={`hsl(159deg 84.1% 50.6%)`} anchor={[volcanoDetails.latitude, volcanoDetails.longitude]} />
                                </Map>
                            </div>
                        </div>
                        {displayChart && (
                            <div id="chart" className="py-10 grid grid-cols-11 gap-2">
                                <div></div>
                                <div className="col-span-9">
                                    <h1 className="text-2xl text-center font-bold py-8">Population Density</h1>
                                    <BarChart data={data}></BarChart>
                                </div>
                                <div></div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Volcano;

