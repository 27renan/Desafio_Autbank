import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../../components/Card/Card';
import './Home.css';

// react redux
import { useDispatch, useSelector } from 'react-redux';
import { addCarrinho } from '../../redux/bookSlice';

// carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

//img
import img_cod_1 from '../../assets/img_dev_1.jpg';
import img_cod_2 from '../../assets/img_dev_2.jpg';
import img_cod_3 from '../../assets/img_dev_3.jpg';
import img_cod_4 from '../../assets/img_dev_4.jpg';
import img_cod_5 from '../../assets/img_dev_5.jpg';
import img_cod_6 from '../../assets/img_dev_6.jpg';

function Home() {
  const compras = useSelector((state) => state);
  const dispatch = useDispatch();
  const [meuCarrinho, setMeuCarrinho] = useState([]);
  const [livros, setLivros] = useState([
    {
      cod: 1,
      qtd: 0,
      img: img_cod_1,
      titulo: 'Inteligência Artifical do Zero',
      autor: 'Martha Gabriel',
      valor: 'R$40,00',
      editora: 'Dev',
      ano: '2015',
    },
    {
      cod: 2,
      qtd: 0,
      img: img_cod_2,
      titulo: 'Logica de Programação',
      autor: 'Edécio Fernandes',
      valor: 'R$40,00',
      editora: 'Dev',
      ano: '2020',
    },
    {
      cod: 3,
      qtd: 0,
      img: img_cod_3,
      titulo: 'C++',
      autor: 'Paul Deitel',
      valor: 'R$40,00',
      editora: 'Dev',
      ano: '2019',
    },
    {
      cod: 4,
      qtd: 0,
      img: img_cod_4,
      titulo: 'Python',
      autor: 'Nilo Ney Coutinho',
      valor: 'R$40,00',
      editora: 'Dev',
      ano: '2017',
    },
    {
      cod: 5,
      qtd: 0,
      img: img_cod_5,
      titulo: 'C#',
      autor: 'John Back',
      valor: 'R$40,00',
      editora: 'Dev',
      ano: '2022',
    },
    {
      cod: 6,
      qtd: 0,
      img: img_cod_6,
      titulo: 'Inteligência Artificial',
      autor: 'Ton Tauli',
      valor: 'R$40,00',
      editora: 'Dev',
      ano: '2018',
    },
  ]);

  const handleAddBook = (item: any) => {
    toast.success(`Livro ${item.titulo} adicionado ao carrinho!`, { theme: 'colored' });
    dispatch(addCarrinho(item));
  };

  return (
    <div className='home'>
      <div className='text'>
        <span>Confira nossas promoções...</span>
      </div>
      <Carousel
        className='carousel'
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
          },
        }}
        draggable={true}
      >
        {livros.map((item) => {
          return (
            <div className='cards' key={item.cod}>
              <Card
                cod={item.cod}
                img={item.img}
                titulo={item.titulo}
                autor={item.autor}
                editora={item.editora}
                ano={item.ano}
                valor={item.valor}
              ></Card>
              <div>
                <Button variant='contained' onClick={() => handleAddBook(item)}>
                  Adicionar ao carrinho
                  <AddShoppingCartIcon className='icon' />
                </Button>
              </div>
            </div>
          );
        })}
      </Carousel>
      <ToastContainer />
    </div>
  );
}

export default Home;
