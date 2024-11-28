"use client";
import { render } from "@/runner/actions";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider"

export default function Home() {

  const program = `

svgFile = "import.svg";

union() {
    
    linear_extrude(height = 2.5) {
        difference() {
            offset(r=-1) {
                    scale(v=[size, size, size]) {
                    import(svgFile);
                    }
                
            }
            
            offset(r=-4) {
                    scale(v=[size, size, size]) {
                    import(svgFile);
                    }
                
            }
        }
    }
    
    linear_extrude(height = 18) {
        difference() {
            offset(r=-3) {
               scale(v=[size, size, size])
               import(svgFile);
            
            }
            offset(r=-4) {
               scale(v=[size, size, size])
               import(svgFile);
            
            }
        }
    }


}
    
`;

  const [isLoading, setIsLoading] = useState(false);
  const [svgContent, setSvgContent] = useState("");
  const [stlFile, setStlFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [scale, setScale] = useState(1);

  function readFile(file: File) {
    //remove extension and replace with .stl
    let exportetFileName = file.name.replace(/\.[^/.]+$/, ".stl");
    setFileName(exportetFileName);
    const reader = new FileReader();
    reader.onload = function (e: any) {
      setSvgContent(e.target?.result as string)
    };
    reader.readAsText(file);
  }

  function convert() {
    setStlFile(null);
    setIsLoading(true);
    render({
      source: "size = " + scale + ";\n\n" + program,
      sourcePath: "./main.scad",
      isPreview: false,
      vars: {},
      features: [],
      extraArgs: [],
      svgFile: svgContent
    }).then((result) => {
      setStlFile(result.stlFile);
      setIsLoading(false);
      console.log(result);
    });
  }

  function download() {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(stlFile!);
    link.download = fileName;
    document.body.append(link);
    link.click();
    link.remove();
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Card className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <CardContent className="flex flex-col gap-8 p-8">
          <h1 className="text-5xl font-bold">
            <span className="text-primary">Plätzchen 3D-Modell Converter</span>
          </h1>
          <label htmlFor="input">Wähle die SVG Datei:</label>
          <input type="file" id="input" accept=".svg" onChange={(e: any) => readFile(e.target.files[0])} />

          <div className="flex flex-col w-full items-start ">
            <label htmlFor="scale">Skalierung:</label>
            <div className="flex flex-row gap-4 w-full items-center ">
              <Slider id="scale" min={0.1} max={2} step={0.1} defaultValue={[1]} className="w-1/2" onValueChange={(value) => setScale(value[0])} />
              <div className="flex flex-row">{Math.floor(scale * 100)}%</div>
            </div>
          </div>

          {
            svgContent != "" ? <div>
              <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`} />
            </div> : <p></p>
          }

          {
            stlFile ? <Button onClick={download}>Download STL</Button> : <></>
          }

          {
            !isLoading ? <Button onClick={convert}>Convert</Button> : <p id="status">Wird konvertiert... Bitte warten... Dieser Vorgang kann bis zu 5 Minuten dauern.</p>
          }

        </CardContent>
      </Card>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://wri-obernburg.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          WRI-Website
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/wri-obernburg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Github  →
        </a>
      </footer>
    </div>
  );
}
