import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Card.css';

// react redux
import { useDispatch } from 'react-redux';
import { addCarrinho } from '../../redux/bookSlice';

function Card({
  cod,
  img,
  titulo,
  autor,
  editora,
  ano,
  valor,
}: {
  cod: number;
  img: any;
  titulo: string;
  autor: string;
  editora: string;
  ano: string;
  valor: string;
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddBook = (
    cod: number,
    img: any,
    titulo: string,
    autor: string,
    editora: string,
    ano: string,
    valor: string
  ) => {
    const livro = {
      cod,
      img,
      titulo,
      autor,
      editora,
      ano,
      valor,
    };
    toast.success(`Livro ${titulo} adicionado ao carrinho!`, { theme: 'colored' });
    dispatch(addCarrinho(livro));
    setOpen(false);
  };

  return (
    <section>
      <div className='item'>
        <div className='capa' onClick={handleClickOpen}>
          <img src={img} alt='capa do livro' />
        </div>
        <div className='informacoes'>
          <p className='titulo'>{titulo}</p>
          <p className='autor'>{autor}</p>
          <p className='valor'>R$40,00</p>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Sobre o livro
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <section className='modal_info'>
              <div className='capa'>
                <img src={img} alt='capa do livro' />
              </div>
              <div className='info'>
                <span>
                  Titulo: <strong>{titulo}</strong>
                </span>
                <span>
                  Autor: <strong>{autor}</strong>
                </span>
                <span>
                  Editora: <strong>{editora}</strong>
                </span>
                <span>
                  Ano: <strong>{ano}</strong>
                </span>
                <span>
                  Valor: <strong>{valor}</strong>
                </span>
              </div>
            </section>
            <div className='btn'>
              <Button variant='contained' onClick={() => handleAddBook(cod, img, titulo, autor, editora, ano, valor)}>
                Adicionar ao carrinho
                <AddShoppingCartIcon className='icon' />
              </Button>
            </div>
            <ToastContainer />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default Card;
