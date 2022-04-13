import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function fancyName(name) {
    return name[0].toUpperCase()+name.slice(1);
}

var Home = props => {
    var router = props.router;
    var [type, setType] = useState("command");
    return (
        <>
            <div className="w-[60vw] lg:w-[80vw] h-[5vh] flex flex-row justify-center items-center gap-[5vw] lg:gap-[10vw]">
                <button id="command" className={"rounded transition-all text-white text-4xl p-2 " + (type==="command"?"border-b-4 border-sky-500":"hover:bg-slate-800")} onClick={c=>setType(c.target.id)}>
                    Command
                </button>
                <button id="event" className={"rounded transition-all text-white text-4xl p-2 " + (type==="event"?"border-b-4 border-sky-500":"hover:bg-slate-800")} onClick={c=>setType(c.target.id)}>
                    Event
                </button>
            </div>
            <div className="w-[80vw] h-[50vh] flex flex-col justify-center items-center gap-[2vw]">
                <div className="w-full h-[10vh] flex flex-col items-center gap-4">
                    <h1 className="text-white text-2xl">
                        {fancyName(type)} Name
                    </h1>
                    <textarea id="name" className="rounded bg-slate-800 w-[50vw] h-[5vh] resize-none text-2xl text-white text-center p-2" placeholder="ping" />
                </div>
                <div className="w-full h-[40vh] flex flex-col items-center gap-4">
                    <h1 className="text-white text-2xl">
                        {fancyName(type)} Script
                    </h1>
                    <textarea id="code" className="rounded bg-slate-800 w-[50vw] h-[30vh] resize-none text-2xl text-white p-2" placeholder="Pong $pingms!" />
                </div>
            </div>
            <button className="rounded text-white text-center text-xl py-2 px-4 bg-slate-800 hover:bg-slate-700" onClick={async (c)=>{
                var content = document.getElementById("code").value;
                var name = document.getElementById("name").value;
                var res = await fetch('/api/createcontent', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({content, name, type})
                });
                var data = await res.json();
                console.log(res);
                router.push("/v1?id="+data._id);
            }}>
                Save
            </button>
        </>
    );
};

export default Home;