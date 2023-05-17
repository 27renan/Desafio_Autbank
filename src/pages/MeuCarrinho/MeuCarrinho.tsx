import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MeuCarrinho.css';

// Dialog
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

// react redux
import { useDispatch, useSelector } from 'react-redux';
import { atualizaCarrinho, carrinhoVazio } from '../../redux/bookSlice';

function MeuCarrinho() {
  const { meuCarrinho } = useSelector((state: any) => state.compras);
  const dispatch = useDispatch();
  const [carrinho, setCarrinho] = useState(new Array<any>());
  const [novoCarrinho, setNovoCarrinho] = useState(new Array<any>());
  const [valor, setValor] = useState('0');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(carrinhoVazio());
    navigate('/');
  };

  useEffect(() => {
    load();
    if (carrinho.length > 1) {
      calculaDesconto();
    } else {
      let valorFinal = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(40);
      setValor(valorFinal);
    }
  });

  const load = () => {
    setCarrinho(meuCarrinho);
    setNovoCarrinho(meuCarrinho);
  };

  const calculaDesconto = () => {
    let qtdlivrosDiferentes = 0;
    let desconto = 0;
    let valorFinal = '';
    let codLivros = new Array<any>();
    carrinho.forEach((item) => codLivros.push(item.cod));

    for (let i = 0; i < codLivros.length; i++) {
      if (codLivros[i] === codLivros[i + 1]) {
      } else {
        qtdlivrosDiferentes++;
      }
    }

    switch (qtdlivrosDiferentes) {
      case 2:
        desconto = (carrinho.length * 40 * 5) / 100;
        valorFinal = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(
          carrinho.length * 40 - desconto
        );
        setValor(valorFinal);
        break;

      case 3:
        desconto = (carrinho.length * 40 * 10) / 100;
        valorFinal = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(
          carrinho.length * 40 - desconto
        );
        setValor(valorFinal);
        break;

      case 4:
        desconto = (carrinho.length * 40 * 20) / 100;
        valorFinal = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(
          carrinho.length * 40 - desconto
        );
        setValor(valorFinal);
        break;

      case 5:
        desconto = (carrinho.length * 40 * 50) / 100;
        valorFinal = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(
          carrinho.length * 40 - desconto
        );
        setValor(valorFinal);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setCarrinho(novoCarrinho);
    calculaDesconto();
  }, [novoCarrinho]);

  const handleRemove = (cod: number) => {
    dispatch(atualizaCarrinho(cod));
    setNovoCarrinho(meuCarrinho);
  };

  return (
    <div className='meuCarrinho'>
      <div className='title'></div>
      {carrinho.length === 0 && <span className='subTitle'>Seu carrinho está vazio!</span>}
      {carrinho.length !== 0 && (
        <div className='cardValor'>
          <div>
            <span className='title'>Meu carrinho</span>
          </div>

          <div className='valor'>
            <span>Valor da compra:{valor}</span>
            <Button className='btn_finalizar' variant='contained' onClick={handleClickOpen}>
              Finalizar compra
            </Button>
          </div>
        </div>
      )}
      <div>
        {carrinho.map((item: any) => {
          return (
            <div className='list_livros' key={item.cod}>
              <div className='img_livro'>
                <img src={item.img} alt='capa do livro' />
              </div>
              <div className='info_car'>
                <span>
                  Titulo: <strong>{item.titulo}</strong>
                </span>
                <span>
                  Autor: <strong>{item.autor}</strong>
                </span>
                <span>
                  Editora: <strong>{item.editora}</strong>
                </span>
                <span>
                  Ano: <strong>{item.ano}</strong>
                </span>
                <span>
                  Valor: <strong>{item.valor}</strong>
                </span>
                <Button className='btn_remover' variant='contained' onClick={() => handleRemove(item.cod)}>
                  Remover do carrinho
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className='textFooter'>As melhores ofertas de livros estão...</div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
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
              <div>
                <div className='modal_finalizar_compra'>
                  <span>Parabéns, compra finalizada com sucesso!!!</span>
                </div>
                <div className='btn_modal'>
                  <Button variant='contained' onClick={handleClose}>
                    Sair
                  </Button>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default MeuCarrinho;
