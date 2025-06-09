// src/components/UserNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  PackagePlus,
  HandHeart,
} from "lucide-react";

const UserNavbar = ({ userName, userAvatar, userGuid, onLogout }) => {
  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors duration-200"
          >
            <HandHeart size={32} className="text-secondary" />{" "}
            <span className="text-2xl font-heading font-bold">Sua Causa</span>{" "}
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/anunciar-produto">
              <Button
                className="flex items-center gap-2 px-4 py-2 rounded-full
                         bg-accent text-primary-dark font-accent font-semibold
                         shadow-md hover:bg-accent-dark hover:shadow-lg
                         transition-all duration-300 transform hover:scale-105"
              >
                <PackagePlus size={20} />
                Oferecer Ajuda
              </Button>
            </Link>

            {/* Dropdown do Usuário */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-customGray-100
                             transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary"
                >
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt="Avatar do Usuário"
                      className="w-8 h-8 rounded-full object-cover border-2 border-secondary"
                    />
                  ) : (
                    <User size={24} className="text-primary-dark" />
                  )}
                  <span className="font-base text-customGray-800 hidden md:inline">
                    {userName || "Usuário"}{" "}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-customGray-200 rounded-md shadow-lg p-2 mr-4">
                <DropdownMenuItem asChild>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3 py-2 rounded-sm text-customGray-700 hover:bg-customGray-100 cursor-pointer"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to={`/usuario/meu-perfil/${userGuid}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-sm text-customGray-700 hover:bg-customGray-100 cursor-pointer"
                  >
                    <User size={18} />
                    Meu Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to={`/usuario/meu-perfil/alterar-dados/${userGuid}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-sm text-customGray-700 hover:bg-customGray-100 cursor-pointer"
                  >
                    <Settings size={18} />
                    Alterar Dados
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-customGray-200 my-1" />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-sm text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <LogOut size={18} />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
