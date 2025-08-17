import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const drawerWidth = 240;
const MarginHeight = 64; // Adjust to your horizontal navbar's height

const VerticalNavbar = ({ navItems, onItemClick, activeIndex }) => {
    return (
        <Box
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                background: '#f8f9fa',
                height: '100vh',
                pt: `${MarginHeight}px`, // Push down by navbar height
                position: 'fixed',
                top: 0,
                left: 0,
                boxSizing: 'border-box',
            }}
        >
            <List>
                {navItems.map((item, idx) => (
                    <ListItem key={item.title} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.link}
                            selected={activeIndex === idx}
                            onClick={() => onItemClick && onItemClick(idx)}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: '#e9ecef',
                                    fontWeight: 'bold',
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default VerticalNavbar;