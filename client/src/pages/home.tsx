import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Settings, 
  Play, 
  AlertTriangle,
  Server,
  Code,
  HelpCircle,
  Cpu,
  FileX,
  Trash2,
  Link,
  Wifi
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-yaml";

export default function Home() {
  const [password, setPassword] = useState("youshallnotpass");
  const [port, setPort] = useState("2333");
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [useJabba, setUseJabba] = useState(true);
  
  useEffect(() => {
    Prism.highlightAll();
  }, [password, port, autoUpdate, useJabba]);

  const generatePythonScript = () => {
    return `import os
import subprocess
import time
import urllib.request
import tarfile
import shutil

# --- CONFIGURATION ---
LAVALINK_URL = "https://github.com/lavalink-devs/Lavalink/releases/download/4.0.8/Lavalink.jar"
JAVA_VERSION = "17"  # Required Java version
PORT = ${port}
PASSWORD = "${password}"
# ---------------------

def install_java():
    """
    Downloads and installs a portable JDK (Zulu) since this is a Python environment.
    """
    if os.path.exists("java"):
        print("✅ Java directory found. Skipping download.")
        return

    print("⬇️  Java not found. Downloading Portable JDK 17...")
    # URL for Zulu JDK 17 Linux x64 (Adjust if architecture differs)
    jdk_url = "https://cdn.azul.com/zulu/bin/zulu17.56.15-ca-jdk17.0.14-linux_x64.tar.gz"
    
    try:
        urllib.request.urlretrieve(jdk_url, "jdk.tar.gz")
        print("📦 Extracting JDK...")
        with tarfile.open("jdk.tar.gz", "r:gz") as tar:
            tar.extractall(".")
        
        # Rename the extracted folder to 'java' for simplicity
        extracted_folders = [f for f in os.listdir() if f.startswith("zulu") and os.path.isdir(f)]
        if extracted_folders:
            os.rename(extracted_folders[0], "java")
            
        os.remove("jdk.tar.gz")
        print("✅ Java installed successfully!")
    except Exception as e:
        print(f"❌ Failed to install Java: {e}")
        exit(1)

def download_lavalink():
    if not os.path.exists("Lavalink.jar") or ${autoUpdate ? "True" : "False"}:
        print("⬇️  Downloading Lavalink.jar...")
        try:
            urllib.request.urlretrieve(LAVALINK_URL, "Lavalink.jar")
            print("✅ Lavalink downloaded.")
        except Exception as e:
            print(f"❌ Failed to download Lavalink: {e}")

def create_application_yml():
    config = f"""
server:
  port: {PORT}
  address: 0.0.0.0
lavalink:
  server:
    password: "{PASSWORD}"
    sources:
      youtube: true
      bandcamp: true
      soundcloud: true
      twitch: true
      vimeo: true
      http: true
      local: false
    filters:
      volume: true
      equalizer: true
      karaoke: true
      timescale: true
      tremolo: true
      vibrato: true
      distortion: true
      rotation: true
      channelMix: true
      lowPass: true
    bufferDurationMs: 400
    frameBufferDurationMs: 5000
    opusEncodingQuality: 10
    resamplingQuality: LOW
    trackStuckThresholdMs: 10000
    useSeekGhosting: true
    youtubePlaylistLoadLimit: 6
    playerUpdateInterval: 5
    youtubeSearchEnabled: true
    soundcloudSearchEnabled: true
    gc-warnings: true

metrics:
  prometheus:
    enabled: false
    endpoint: /metrics

sentry:
  dsn: ""
  environment: ""

logging:
  file:
    path: ./logs/
  level:
    root: INFO
    lavalink: INFO

  request:
    enabled: true
    includeClientInfo: true
    includeHeaders: false
    includeQueryString: true
    includePayload: true
    maxPayloadLength: 10000

  """
    with open("application.yml", "w") as f:
        f.write(config)
    print("✅ application.yml generated.")

def run_lavalink():
    java_bin = os.path.abspath("java/bin/java")
    cmd = [java_bin, "-jar", "Lavalink.jar"]
    
    print(f"🚀 Starting Lavalink on port {PORT}...")
    try:
        subprocess.run(cmd, check=True)
    except KeyboardInterrupt:
        print("\\n🛑 Stopping Lavalink...")

if __name__ == "__main__":
    print("--- 🐍 Python Lavalink Launcher ---")
    install_java()
    download_lavalink()
    create_application_yml()
    run_lavalink()
`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-mono font-bold tracking-tight text-white flex items-center gap-3">
              <Terminal className="text-primary h-8 w-8" />
              Lava<span className="text-primary">Py</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Running a Java application on a Python-only Pterodactyl egg? 
              This tool generates a Python script that installs a portable JDK and launches Lavalink for you.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground uppercase">System Online</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Configuration Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm glow-box">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Configuration
                </CardTitle>
                <CardDescription>
                  Configure your Lavalink instance settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="font-mono bg-background/50 border-border focus:border-primary transition-all"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Set this in your bot's config.js as well.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input 
                    id="port" 
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    className="font-mono bg-background/50 border-border focus:border-primary transition-all"
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-Update</Label>
                      <p className="text-xs text-muted-foreground">Download latest Lavalink.jar on start</p>
                    </div>
                    <Switch 
                      checked={autoUpdate}
                      onCheckedChange={setAutoUpdate}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Portable Java</Label>
                      <p className="text-xs text-muted-foreground">Install JDK 17 automatically</p>
                    </div>
                    <Switch 
                      checked={useJabba}
                      onCheckedChange={setUseJabba}
                      disabled
                    />
                  </div>
                </div>

              </CardContent>
            </Card>

            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="pt-6 flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-destructive">Restriction Bypass</h4>
                  <p className="text-sm text-destructive-foreground/80">
                    This script bypasses the Python environment restriction by downloading a portable Java Runtime (Zulu JDK). Ensure your host allows downloading external binaries.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-border/50">
                <AccordionTrigger className="text-muted-foreground hover:text-primary transition-colors">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    How does this work?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-3">
                  <p>
                    Pterodactyl "Eggs" (containers) are usually locked to one language. A Python egg doesn't have the <code className="text-primary bg-primary/10 px-1 rounded">java</code> command installed.
                  </p>
                  <div className="space-y-2 pl-2 border-l-2 border-primary/20">
                    <div className="flex gap-2 items-start text-xs">
                      <Download className="w-3 h-3 mt-1 text-primary" />
                      <span>The script downloads a <strong>Portable JDK 17</strong> (Zulu) directly into your server files.</span>
                    </div>
                    <div className="flex gap-2 items-start text-xs">
                      <Cpu className="w-3 h-3 mt-1 text-primary" />
                      <span>It extracts it to a local <code className="text-xs bg-muted px-1 rounded">/java</code> folder.</span>
                    </div>
                    <div className="flex gap-2 items-start text-xs">
                      <Play className="w-3 h-3 mt-1 text-primary" />
                      <span>It runs Lavalink using <code className="text-xs bg-muted px-1 rounded">./java/bin/java</code> instead of the system java.</span>
                    </div>
                  </div>
                  <p className="text-xs pt-2">
                    This effectively turns your Python container into a Java container without needing root access or Docker changes.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>

          {/* Code Output Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="python" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-card/50 border border-border/50">
                  <TabsTrigger value="python" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Code className="w-4 h-4" />
                    main.py
                  </TabsTrigger>
                  <TabsTrigger value="startup" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Server className="w-4 h-4" />
                    Startup Command
                  </TabsTrigger>
                  <TabsTrigger value="troubleshoot" className="flex items-center gap-2 data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
                    <AlertTriangle className="w-4 h-4" />
                    Troubleshoot
                  </TabsTrigger>
                  <TabsTrigger value="connect" className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                    <Link className="w-4 h-4" />
                    Connect Bot
                  </TabsTrigger>
                </TabsList>
                
                <Button 
                  onClick={() => copyToClipboard(generatePythonScript())}
                  variant="outline" 
                  className="gap-2 border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <Copy className="w-4 h-4" />
                  Copy Code
                </Button>
              </div>

              <TabsContent value="python" className="mt-0">
                <div className="space-y-2 mb-4">
                  <div className="bg-primary/10 border border-primary/30 p-3 rounded-md flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-primary">Copy ONLY this code</p>
                      <p className="text-xs text-muted-foreground mt-1">Click "Copy Code" below to copy just the Python script. Do not copy the header or description.</p>
                    </div>
                  </div>
                </div>
                <Card className="border-border/50 bg-[#1d1f21] overflow-hidden shadow-2xl">
                  <ScrollArea className="h-[600px] w-full">
                    <div className="p-4">
                      <pre className="text-sm font-mono !bg-transparent !m-0 !p-0">
                        <code className="language-python">{generatePythonScript()}</code>
                      </pre>
                    </div>
                  </ScrollArea>
                </Card>
              </TabsContent>

              <TabsContent value="startup" className="mt-0">
                 <Card className="border-border/50 bg-card">
                   <CardHeader>
                     <CardTitle>Pterodactyl Configuration</CardTitle>
                     <CardDescription>
                       Keep your existing startup command. Just change the <strong>PY_FILE</strong> variable.
                     </CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-6">
                     <div className="space-y-2">
                       <Label>Your Startup Command (Default)</Label>
                       <div className="p-4 bg-black/50 rounded-md border border-border font-mono text-xs text-muted-foreground break-all whitespace-pre-wrap">
                         if [[ -d .git ]] && [[ "{`{{AUTO_UPDATE}}`}" == "1" ]]; then git pull; fi; if [[ ! -z "{`{{PY_PACKAGES}}`}" ]]; then pip install -U --prefix .local {`{{PY_PACKAGES}}`}; fi; if [[ -f /home/container/${`{REQUIREMENTS_FILE}`} ]]; then pip install -U --prefix .local -r ${`{REQUIREMENTS_FILE}`}; fi; <span className="text-green-400 font-bold">/usr/local/bin/python /home/container/{`{{PY_FILE}}`}</span>
                       </div>
                       <p className="text-xs text-muted-foreground">
                         You do <strong>not</strong> need to change this command.
                       </p>
                     </div>

                     <div className="space-y-2">
                       <Label>Variable to Change</Label>
                       <div className="grid gap-2 border border-primary/20 bg-primary/5 p-4 rounded-md">
                         <div className="flex justify-between items-center">
                           <span className="font-mono text-sm">PY_FILE</span>
                           <span className="font-mono text-sm text-green-400 font-bold">main.py</span>
                         </div>
                         <p className="text-xs text-muted-foreground">
                           In your "Startup" tab, find the <code>PY_FILE</code> variable and set it to the name of the script you created (e.g., <code>main.py</code>).
                         </p>
                       </div>
                     </div>
                     
                     <div className="rounded-md bg-blue-500/10 border border-blue-500/20 p-4">
                        <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2 mb-2">
                          <Check className="w-4 h-4" />
                          Logic Check
                        </h4>
                        <p className="text-xs text-blue-300/80">
                          Your panel runs <strong>Python</strong> → Python downloads <strong>Java</strong> → Python runs <strong>Lavalink</strong>.
                          <br />
                          To the server, it looks like a normal Python bot!
                        </p>
                     </div>
                   </CardContent>
                 </Card>
              </TabsContent>

              <TabsContent value="troubleshoot" className="mt-0">
                <Card className="border-destructive/50 bg-destructive/10">
                  <CardHeader>
                    <CardTitle className="text-destructive flex items-center gap-2">
                      <FileX className="w-5 h-5" />
                      Fixing "No matching distribution" Error
                    </CardTitle>
                    <CardDescription className="text-destructive-foreground/80">
                      If you see errors like <code>Collecting npm</code> or <code>ERROR: No matching distribution found for install</code>, check this.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {/* Error 1: Requirements */}
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                        <div className="flex gap-2 items-start text-red-400 font-mono text-xs mb-2">
                           <AlertTriangle className="w-4 h-4 shrink-0" />
                           <span>ERROR: No matching distribution found for install</span>
                        </div>
                        <p className="text-sm text-foreground font-semibold">Solution: Delete requirements.txt</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Go to your <strong>Files</strong> tab and delete <code>requirements.txt</code>. It contains invalid packages.
                        </p>
                      </div>

                      {/* Error 2: Missing File */}
                      <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-md">
                        <div className="flex gap-2 items-start text-orange-400 font-mono text-xs mb-2">
                           <FileX className="w-4 h-4 shrink-0" />
                           <span>python: can't open file 'main.py': [Errno 2] No such file</span>
                        </div>
                        <p className="text-sm text-foreground font-semibold">Solution: Create the file</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          You haven't created the script yet!
                          <br/>
                          1. Go to <strong>Files</strong> tab.
                          <br/>
                          2. Click <strong>New File</strong>.
                          <br/>
                          3. Name it <code>main.py</code>.
                          <br/>
                          4. Paste the code from the <strong>main.py</strong> tab on this page.
                        </p>
                      </div>

                      {/* Error 3: Syntax Error */}
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-md">
                        <div className="flex gap-2 items-start text-purple-400 font-mono text-xs mb-2">
                           <Code className="w-4 h-4 shrink-0" />
                           <span>SyntaxError: invalid syntax</span>
                        </div>
                        <p className="text-sm text-foreground font-semibold">Solution: Copy ONLY the code</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          You likely copied text other than the Python code (like the description or header).
                          <br/>
                          <br/>
                          ✅ <strong>Correct:</strong> Use the "Copy Code" button in the <strong>main.py</strong> tab. This copies ONLY the Python script.
                          <br/>
                          ❌ <strong>Wrong:</strong> Manually selecting and copying from the code area.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="connect" className="mt-0">
                <Card className="border-secondary/50 bg-secondary/10">
                  <CardHeader>
                    <CardTitle className="text-secondary flex items-center gap-2">
                      <Wifi className="w-5 h-5" />
                      Connecting Your Bot
                    </CardTitle>
                    <CardDescription className="text-secondary-foreground/80">
                      Use these values in your bot's <code>config.js</code> or <code>.env</code> file.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-secondary-foreground">HOST / IP</Label>
                        <div className="p-3 bg-black/50 rounded-md border border-secondary/30 font-mono text-sm text-green-400">
                          {/* We don't know their IP, but usually it's the server IP */}
                          127.0.0.1
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                           <p>If bot is on the <strong>SAME server</strong>, use <code>127.0.0.1</code>.</p>
                           <div className="pt-2 border-t border-secondary/20">
                             <p className="font-semibold text-secondary">Where to find external IP?</p>
                             <p>Go to your Pterodactyl Panel → <strong>Network</strong> tab.</p>
                             <p>Look for the <strong>Primary</strong> allocation IP (e.g., <code>142.x.x.x</code>).</p>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                         <Label className="text-secondary-foreground">PORT</Label>
                         <div className="p-3 bg-black/50 rounded-md border border-secondary/30 font-mono text-sm text-green-400">
                           {port}
                         </div>
                         <div className="text-xs text-muted-foreground space-y-1">
                           <p>Must match the port in the configuration panel.</p>
                           <div className="pt-2 border-t border-secondary/20">
                             <p className="font-semibold text-secondary">Where to find available ports?</p>
                             <p>Go to your Pterodactyl Panel → <strong>Network</strong> tab.</p>
                             <p>Use one of the ports listed there (e.g., <code>{port}</code>).</p>
                           </div>
                         </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-secondary-foreground">PASSWORD</Label>
                        <div className="p-3 bg-black/50 rounded-md border border-secondary/30 font-mono text-sm text-green-400">
                           {password}
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                           <p>This is NOT from the panel. It is set by <strong>YOU</strong> right here in this tool.</p>
                           <p>Make sure this matches what you put in your bot's config.</p>
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-secondary-foreground">SECURE / SSL</Label>
                         <div className="p-3 bg-black/50 rounded-md border border-secondary/30 font-mono text-sm text-green-400">
                           false
                         </div>
                         <p className="text-xs text-muted-foreground">
                           LavaPy runs on HTTP, so set this to <code>false</code>.
                         </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
