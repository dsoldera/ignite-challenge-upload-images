import { CardList } from "@/components/CardList";
import { Error } from "@/components/Error";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { api } from "@/services/api";
import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";

export default function Home() {

  const getImages = async () => {
    const response = await api.get('/api/fauna');
    return response.data;
  }

  const { status, data, error} = useQuery({ 
    queryKey: ['images'], 
    queryFn: getImages
  })

  
  const formattedData = useMemo(() => {
    if(status === 'success') {
      return data.data;
      // const data: [] = images.map((image) => {
      //   return ({
      //     title: image.title,
      //     description: image.description,
      //     url: image.url,
      //     ts: image.imgTs,
      //     id: image.id
      //   })
      // });
    }
    return [];
  }, [data, status]);
  
  //console.log('formatedData', formattedData);
  return (
    <>
      <Header />
      { status === 'pending' && (<Loading />)}
      { error && (<Error />)}
      <Box maxW={1120} px={20} mx="auto" my={20}>
      {status === 'success' && <CardList cards={formattedData} />} 
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
