import { Loading } from "@/components/Loading";
import { Button, HStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <h1>Hello Nextjs</h1>
      <HStack>
        <Button>Click me</Button>
        <Loading />
      </HStack>
    </>
  );
}
