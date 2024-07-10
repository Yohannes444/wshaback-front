import * as React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  marginTop: theme.spacing(5),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
}));

export default function TicketInvoice() {
  const location = useLocation();
  const ticket = location.state?.ticket;

  console.log(ticket)

  if (!ticket) {
    return (
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Ticket Invoice
          </Typography>
          <Typography variant="body1" component="div">
            No ticket data available.
          </Typography>
        </CardContent>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Ticket Invoice
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Game ID:</strong> {ticket.gameId}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Ticket ID:</strong> {ticket.tiketId}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Pay Status:</strong> {ticket.payd ? "Paid" : "Unpaid"}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Cancelled:</strong> {ticket.canceled ? "Yes" : "No"}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Created At:</strong> {ticket.createdAt}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Updated At:</strong> {ticket.updatedDate}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Total Prize:</strong> {ticket.totslPrize}
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          Bets
        </Typography>
        <List>
          {ticket.bets.map((bet, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Bet Amount: ${bet?.betAmount}, Win: ${bet.win ? "Yes" : "No"}, Prize: ${bet?.prize}`}
                secondary={`Selected Buttons: ${bet?.selectedButtons?.map((btn) => `[${btn}]`).join(", ")}, Exacta: ${bet?.isExactaActive ? "Yes" : "No"}, Quinella: ${bet.isQuinellaActive ? "Yes" : "No"}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </StyledCard>
  );
}
