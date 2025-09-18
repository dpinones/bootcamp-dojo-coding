// "use client"

import Link from "next/link";
import Image from "next/image";
import { ConnectedAddress } from "~~/components/ConnectedAddress";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
// import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
// import { CairoOption, CairoOptionVariant } from "starknet";
// import { useScaffoldMultiWriteContract } from "~~/hooks/scaffold-stark/useScaffoldMultiWriteContract";
// import { useDeployedContractInfo } from "~~/hooks/scaffold-stark";

const Home = () => {

  // const YourContract = useDeployedContractInfo("YourContract");

  // const { data: greeting, isLoading} = useScaffoldReadContract({
  //   contractName: "YourContract",
  //   functionName: "greeting"
  // });

  // const {sendAsync: setGreeting } = useScaffoldWriteContract({
  //   contractName: "YourContract",
  //   functionName: "set_greeting",
  //   args: [
  //     "Que onda los pibes?", new CairoOption(CairoOptionVariant.None, 0n)
  //   ]
  // });

  // const { sendAsync: setGreetingwithPremium } = useScaffoldMultiWriteContract({
  //   calls: [
  //     {
  //       contractName: "Strk",
  //       functionName: "approve",
  //       args: [
  //         YourContract.data?.address, 2000000000000000000n
  //       ]
  //     },
  //     {
  //       contractName: "YourContract",
  //       functionName: "set_greeting",
  //       args: [
  //         "Los pibes premium?", new CairoOption(CairoOptionVariant.Some, 2000000000000000000n)
  //       ]
  //     }
  //   ]
  // });

  return (
    <div className="flex items-center flex-col grow pt-10">
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">Scaffold-Stark 2</span>

          {/* <span className="text-2xl">{greeting?. toString()}</ span>
          
          <button className="btn btn-primary" onClick={() => setGreeting()}>
          Set Greeting
          </ button>
          
          <button
            className="btn-primary"
            onClick={() => setGreetingwithPremium()}
          >
            Set Greeting With Premium 
          </ button> */}

        </h1>
        <ConnectedAddress />
        <p className="text-center text-lg">
          Edit your smart contract{" "}
          <code className="bg-underline italic text-base font-bold max-w-full break-words break-all inline-block">
            your_contract.cairo
          </code>{" "}
          in{" "}
          <code className="bg-underline italic text-base font-bold max-w-full break-words break-all inline-block">
            packages/snfoundry/contracts/src
          </code>
        </p>
      </div>

      <div className="bg-container grow w-full mt-16 px-8 py-12">
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          <div className="flex flex-col bg-base-100 relative text-[12px] px-10 py-10 text-center items-center max-w-xs rounded-3xl border border-gradient">
            <div className="trapeze"></div>
            <Image
              src="/debug-icon.svg"
              alt="icon"
              width={26}
              height={30}
            ></Image>
            <p>
              Tinker with your smart contract using the{" "}
              <Link href="/debug" passHref className="link">
                Debug Contracts
              </Link>{" "}
              tab.
            </p>
          </div>
          <div className="flex flex-col bg-base-100 relative text-[12px] px-10 py-10 text-center items-center max-w-xs rounded-3xl border border-gradient">
            <div className="trapeze"></div>
            <Image
              src="/explorer-icon.svg"
              alt="icon"
              width={20}
              height={32}
            ></Image>
            <p>
              Play around with Multiwrite transactions using
              useScaffoldMultiWrite() hook
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
