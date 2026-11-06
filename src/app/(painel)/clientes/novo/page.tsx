import {getCurrentUser} from '@/lib/auth';
import {getResellers} from '@/services';
import {NewCustomerForm} from '@/components/new-customer-form';
export default async function NovoCliente(){
 const user=await getCurrentUser();
 const resellers=(await getResellers(user)).filter(r=>r.status==='ativo').map(r=>({id:r.id,name:r.name}));
 return <NewCustomerForm resellers={resellers} isMaster={user.role==='master'}/>;
}
