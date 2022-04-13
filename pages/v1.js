import { useState } from "react";

function fancyName(name) {
    return name[0].toUpperCase()+name.slice(1);
}

var Item = props => {
    var router = props.router;
    var [data, setData] = useState(props);
    return (
        <>
            <div className="w-[60vw] lg:w-[80vw] h-[5vh] flex flex-row justify-center items-center gap-[5vw] lg:gap-[10vw]">
                <h1 className="rounded transition-all text-white text-4xl p-2 border-b-2 border-sky-500">
                    {fancyName(data.type)}
                </h1>
            </div>
            <div className="w-[80vw] h-[50vh] flex flex-col justify-center items-center gap-[2vw]">
                <div className="w-full h-[10vh] flex flex-col items-center gap-4">
                    <h1 id="nameid" className="text-white text-2xl">
                        {fancyName(data.type)} Name
                    </h1>
                    <textarea id="name" className="rounded bg-slate-800 w-[50vw] h-[5vh] resize-none text-2xl text-white text-center p-2" placeholder="ping" defaultValue={fancyName(data.type)}></textarea>
                </div>
                <div className="w-full h-[40vh] flex flex-col items-center gap-4">
                    <h1 id="codeid" className="text-white text-2xl">
                        {fancyName(data.type)} Script
                    </h1>
                    <textarea id="code" className="rounded bg-slate-800 w-[50vw] h-[30vh] resize-none text-2xl text-white p-2" placeholder="Pong $pingms!" defaultValue={data.content}></textarea>
                </div>
            </div>
            <button className="rounded text-white text-center text-xl py-2 px-4 bg-slate-800 hover:bg-slate-700" onClick={async (c)=>{
                var content = document.getElementById("code").value;
                var name = document.getElementById("name").value;
                var { type } = data;
                var res = await fetch('/api/createcontent', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({content, name, type})
                });
                var thisdata = await res.json();
                router.push("/v1?id="+thisdata._id);
            }}>
                Save
            </button>
        </>
    );
};

export async function getServerSideProps(req, res) {
    if (!req.query.id) {
        return { props: { type: "Unkown", name: "Unkown", content: "Unkown" }};
    } else {
        var response = await fetch(process.env.host+'/api/fetchcontent?id='+req.query.id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        });
        var data = await response.json();
        return { props: data };
    }
}

export default Item;