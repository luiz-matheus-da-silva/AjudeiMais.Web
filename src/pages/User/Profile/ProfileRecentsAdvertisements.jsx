import React, { useRef, useState, useEffect } from "react";
import axios from "axios"; // Certifique-se de que o axios está importado
import {
  Package,
  XCircle,
  CheckCircle,
  PlusCircle,
  Loader2,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Alert } from "../../../components/Alert";

const ProfileRecentsAdvertisements = () => {
  const { user } = useUser(); 

  const [advertisements, setAdvertisements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      if (!user?.guid) {
        setError(
          new Error("User ID not available. Cannot fetch advertisements.")
        );
        setIsLoading(false);
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL;

      try {
        const response = await axios.get(
          `${apiUrl}/produto/usuario/${user.guid}`
        );
        if (response.data && response.data.success) {
          setAdvertisements(response.data.data);
          console.log("Dados do perfil recebidos:", response.data.data);
        } else {
          setError(
            new Error(response.data?.message || "Erro ao buscar anúncios.")
          );
          setAdvertisements([]);
          console.log(response.data?.message);
        }
      } catch (err) {
        console.error("Erro ao buscar anúncios:", err);
        setAlert({
          type: "warning",
          message: "Erro ao buscar anúncios. Se o problema persistir, entre em contato com o suporte.",
        }); 
        setAdvertisements([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvertisements();
  }, [user?.guid]);

  // Função para rolar o carrossel para a esquerda
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -312,
        behavior: "smooth",
      });
    }
  };

  // Função para rolar o carrossel para a direita
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 312,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mx-auto my-10 max-w-screen-xl px-4 md:px-0">
      {alert && (
        <Alert type={alert.type} children={alert.message}/>
      )}
      {isLoading && (
        <Card className="w-full animate-pulse rounded-lg bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2 text-primary-dark">
              <Package size={24} /> Anúncios Recentes
            </CardTitle>
            <CardDescription className="font-base text-customGray-600">
              Carregando seus anúncios...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin-slow text-primary" />
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="w-full rounded-lg bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2 text-danger">
              <XCircle size={24} /> Erro ao Carregar Anúncios
            </CardTitle>
            <CardDescription className="font-base text-customGray-600">
              Não foi possível carregar seus anúncios recentes. Por favor, tente
              novamente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">
              {error.message || "Erro desconhecido ao carregar anúncios."}
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading &&
        !error &&
        (!advertisements || advertisements.length === 0) && (
          <Card className="w-full rounded-lg bg-white p-6 text-center shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="font-heading flex items-center justify-center gap-2 text-2xl text-primary-dark">
                <Package size={28} /> Nenhum Anúncio Recente
              </CardTitle>
              <CardDescription className="font-base mt-2 text-customGray-600">
                Parece que você ainda não tem anúncios publicados.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="mb-6 text-lg text-customGray-700">
                Que tal começar agora? Faça a diferença na vida de alguém!
              </p>
              <Link to="/anunciar">
                <Button className="duration-3000 rounded-full bg-accent px-8 py-3 font-semibold shadow-md transition-all hover:bg-accent-dark hover:text-white">
                  <PlusCircle size={20} className="mr-2" /> Anunciar Agora!
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

      {!isLoading && !error && advertisements && advertisements.length > 0 && (
        <Card className="w-full rounded-lg bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading flex items-center gap-2 text-2xl text-primary-dark">
              <Package size={24} /> Seus Anúncios Recentes
            </CardTitle>
            <CardDescription className="font-base text-customGray-600">
              Navegue pelos seus anúncios publicados.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            {" "}
            <button
              onClick={scrollLeft}
              className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white bg-opacity-80 p-2 shadow-lg transition-all duration-200 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-light md:-left-6"
              aria-label="Anúncio anterior"
            >
              <ChevronLeft className="h-6 w-6 text-primary-dark" />
            </button>
            <div
              ref={scrollContainerRef}
              className="hide-scrollbar flex overflow-x-auto scroll-smooth py-4 pl-4 pr-4 snap-x snap-mandatory" // Ajustado o padding e removido o -mx-4
            >
              <div className="flex space-x-6">
                {" "}
                {advertisements.map((ad) => (
                  <div
                    key={ad.id}
                    className="w-72 flex-shrink-0 transform overflow-hidden rounded-lg border border-customGray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:w-80 lg:w-96 snap-start"
                  >
                    <img
                      src={ad.imageUrl}
                      alt={ad.productName}
                      className="h-56 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-semibold text-primary-dark">
                        {ad.productName}
                      </h3>
                      <div className="mb-4 flex items-center text-sm font-base">
                        {ad.status === "disponivel" ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle size={16} className="mr-1" />{" "}
                            Disponível
                          </span>
                        ) : (
                          <span className="flex items-center text-red-600">
                            <XCircle size={16} className="mr-1" /> Não
                            Disponível
                          </span>
                        )}
                      </div>
                      <Link to={`/anuncio/${ad.id}/gerenciar`}>
                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary transition-all duration-300 hover:bg-primary-light hover:text-white"
                        >
                          <Edit size={16} className="mr-2" /> Gerenciar Anúncio
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollRight}
              className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white bg-opacity-80 p-2 shadow-lg transition-all duration-200 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-light md:-right-6"
              aria-label="Próximo anúncio"
            >
              <ChevronRight className="h-6 w-6 text-primary-dark" />
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileRecentsAdvertisements;
