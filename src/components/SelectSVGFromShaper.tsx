"use client";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from "next/image";
import {ArrowRight} from "lucide-react";

class SVGModel {
    _id: string;
    type: string;
    path: string;
    name: string;
    blob: string;
    blobs: string[];
    size: number;
    created: string;
    modified: string;
    thumbnailURI: string;

    constructor(data: any) {
        this._id = data._id;
        this.type = data.type;
        this.path = data.path;
        this.name = data.name;
        this.blob = data.blob;
        this.blobs = data.blobs;
        this.size = data.size;
        this.created = data.created;
        this.modified = data.modified;
        this.thumbnailURI = data.thumbnailURI;
    }
}

function svgEntry(svgModel: SVGModel) {
    return <Card className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <CardHeader className="flex flex-col gap-8">
            <CardContent className={"flex flex-row gap-4 items-center  w-full p-0"}>
                <div className={"flex flex-row gap-4 items-center p-0"}>
                    <Image src={svgModel.thumbnailURI} alt={svgModel.name} width={100} height={100} />
                    <p className="text-primary text-xl font-bold">{svgModel.name}</p>
                </div>
                <ArrowRight className="w-6 h-6" />
            </CardContent>
        </CardHeader>
    </Card>
}


export default function SelectSVGFromShaper(props: {onSelect: (svgModel: File) => void, pw: string, user: string}) {
    const [svgModels, setSvgModels] = useState<SVGModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [openState, setOpenState] = useState(false);
    const [downloading, setDownloading] = useState(false);


    function changeOpenState(newState: boolean) {
        setOpenState(newState);
        if(!newState) {
            setDownloading(false);
            setSvgModels([]);
            setLoading(false);
        }else{
            loadData();
        }

    }

   async function selectSvgModel(svgModel: SVGModel) {
        setOpenState(false);
        setDownloading(true);
        const response = await fetch("/api/downloadSVGFromShapertools?blobKey="+svgModel.blob+"&pw="+props.pw+"&user="+props.user).then((response) => response.json());
        const downloadURL = await response.downloadURL;
        //download file from url
        const file = await fetch(downloadURL).then((response) => response.blob()).then((blob) => new File([blob], svgModel.name, {type: "image/svg+xml"}));
        props.onSelect(file);
        setDownloading(false);

    }

    function loadData() {
        setLoading(true);
        try {
            fetch("/api/getSVGs"+"?pw="+props.pw+"&user="+props.user)
                .then((response) => response.json())
                .then((data) => {
                    if(data!=null && data.results!=null) {
                        setSvgModels(data.results);
                        setLoading(false);
                    }
                });
        }catch (e) {

        }
    }



    return (
        <Dialog open={openState} onOpenChange={changeOpenState}>
            <DialogTrigger asChild><Button disabled={downloading}>{downloading? "Loading...": "Import from Shapertools"}</Button></DialogTrigger>
            <DialogContent className={"max-h-[60vh] max-w-[50vw] overflow-y-hidden"}>
                <DialogHeader>
                    <DialogTitle>Select file from Shapertools</DialogTitle>
                    <DialogDescription asChild>
                        <div className={"max-h-[50vh] max-w-[50vw]"}>
                            Select the file you want to import from Shapertools.
                            <br/><br/>
                            {loading && <p>Loading...</p>}
                            {!loading && svgModels.length === 0 && <p>No files found.</p>}
                            <div className={"overflow-y-scroll flex flex-col gap-4 w-full h-[90%] flex-1 justify-stretch p-8 cursor-pointer"}>
                                {
                                    !loading && svgModels.length > 0 &&
                                    svgModels.map((svgModel) => (
                                        <div key={svgModel._id} onClick={() => selectSvgModel(svgModel)}>
                                            {svgEntry(svgModel)}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}